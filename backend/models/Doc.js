import mongoose from 'mongoose'

const docSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      default: '',
      trim: true,
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
)

// Full-text index for powerful search
docSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text', category: 'text' }, {
  weights: { title: 10, tags: 8, excerpt: 5, category: 3, content: 1 },
  name: 'docs_fulltext_search',
})

// Slug index
docSchema.index({ published: 1, createdAt: -1 })

export const Doc = mongoose.model('Doc', docSchema)
