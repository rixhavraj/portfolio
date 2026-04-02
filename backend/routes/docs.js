import express from 'express'
import { Doc } from '../models/Doc.js'

const router = express.Router()

// ── Helper: compute read time ──────────────────────────────
const computeReadTime = (content = '') => {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)) // 200 wpm
}

// ── Helper: generate slug from title ─────────────────────
const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// ─────────────────────────────────────────────────────────
// GET /api/docs — list all published docs (paginated)
// ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(50, parseInt(req.query.limit) || 20)
    const category = req.query.category || null
    const tag = req.query.tag || null

    const filter = { published: true }
    if (category) filter.category = category
    if (tag) filter.tags = tag

    const [docs, total] = await Promise.all([
      Doc.find(filter)
        .select('-content') // exclude heavy content from list
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Doc.countDocuments(filter),
    ])

    res.json({
      docs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/docs/search?q=...  — POWERFUL SEARCH
// Uses MongoDB $text + regex fallback + fuzzy tag matching
// ─────────────────────────────────────────────────────────
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim()
    if (!q) return res.json({ docs: [], query: q })

    const limit = Math.min(30, parseInt(req.query.limit) || 15)

    // 1) Full-text search (fast, weighted by index)
    const textResults = await Doc.find(
      { $text: { $search: q }, published: true },
      { score: { $meta: 'textScore' } }
    )
      .select('-content')
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .lean()

    // 2) Regex fallback for partial/prefix matches not caught by $text
    const words = q.split(/\s+/).filter(Boolean)
    const regexParts = words.map(w => `(?=.*${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('')
    const regex = new RegExp(regexParts, 'i')

    const regexResults = await Doc.find({
      published: true,
      _id: { $nin: textResults.map(d => d._id) }, // don't duplicate
      $or: [
        { title: regex },
        { excerpt: regex },
        { tags: { $elemMatch: { $regex: q, $options: 'i' } } },
        { category: regex },
      ],
    })
      .select('-content')
      .limit(limit)
      .lean()

    // 3) Merge & score
    const combined = [
      ...textResults.map(d => ({ ...d, _searchScore: (d.score || 0) * 10 + 5 })),
      ...regexResults.map(d => ({ ...d, _searchScore: 2 })),
    ]

    // Sort by score desc
    combined.sort((a, b) => b._searchScore - a._searchScore)

    res.json({ docs: combined.slice(0, limit), query: q, total: combined.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/docs/categories — get all categories + counts
// ─────────────────────────────────────────────────────────
router.get('/categories', async (req, res) => {
  try {
    const cats = await Doc.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    res.json(cats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/docs/:slug — get single doc by slug (increments views)
// ─────────────────────────────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const doc = await Doc.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean()

    if (!doc) return res.status(404).json({ error: 'Doc not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// POST /api/docs — create a new doc
// ─────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, coverImage, published } = req.body
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' })

    const slug = toSlug(title) + '-' + Date.now().toString(36)
    const readTime = computeReadTime(content)

    const doc = await Doc.create({
      title,
      slug,
      content,
      excerpt: excerpt || content.replace(/[#*`[\]]/g, '').slice(0, 160).trim() + '…',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
      category: category || 'general',
      coverImage: coverImage || '',
      published: published ?? false,
      readTime,
    })
    console.log("new Docs added", doc)

    res.status(201).json(doc)
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'A doc with this title already exists' })
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// PUT /api/docs/:id — update a doc
// ─────────────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, coverImage, published } = req.body
    const updates = {}

    if (title !== undefined) updates.title = title
    if (content !== undefined) {
      updates.content = content
      updates.readTime = computeReadTime(content)
    }
    if (excerpt !== undefined) updates.excerpt = excerpt
    if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean)
    if (category !== undefined) updates.category = category
    if (coverImage !== undefined) updates.coverImage = coverImage
    if (published !== undefined) updates.published = published

    const doc = await Doc.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ error: 'Doc not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// DELETE /api/docs/:id — delete a doc
// ─────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const doc = await Doc.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: 'Doc not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/docs/admin/all — list ALL docs incl. unpublished
// ─────────────────────────────────────────────────────────
router.get('/admin/all', async (req, res) => {
  try {
    const docs = await Doc.find().select('-content').sort({ createdAt: -1 }).lean()
    res.json(docs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
