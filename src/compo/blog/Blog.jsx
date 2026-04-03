import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, DOCS_API } from './apiBase'

const API = DOCS_API

// ── Meteor background ────────────────────────────────────
const METEORS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
  width: `${60 + Math.random() * 80}px`,
}))

// ── Icons ────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const EyeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const TagIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

// ── Highlight matched text ───────────────────────────────
function Highlight({ text = '', query = '' }) {
  if (!query.trim()) return <span>{text}</span>
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} style={{ background: 'rgba(34,197,94,0.25)', color: '#4ade80', borderRadius: 3, padding: '0 2px' }}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  )
}

// ── Doc Card ─────────────────────────────────────────────
function DocCard({ doc, query }) {
  const date = new Date(doc.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  const categoryColors = {
    research: '#7c3aed',
    guide: '#0e7490',
    blog: '#065f46',
    devlog: '#92400e',
    general: '#374151',
  }
  const catColor = categoryColors[doc.category?.toLowerCase()] || '#374151'

  return (
    <Link
      to={`/blog/${doc.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article
        style={{
          border: '1px solid #27272a',
          borderRadius: 12,
          padding: '20px 24px',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#3f3f46'
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#27272a'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        {/* Category + date row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '2px 8px', borderRadius: 4, background: catColor + '33',
            border: `1px solid ${catColor}55`, color: catColor === '#374151' ? '#9ca3af' : catColor,
          }}>
            {doc.category || 'general'}
          </span>
          <span style={{ fontSize: 12, color: '#52525b' }}>·</span>
          <span style={{ fontSize: 12, color: '#52525b' }}>{date}</span>
        </div>

        {/* Title */}
        <h2 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#fafafa', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
          <Highlight text={doc.title} query={query} />
        </h2>

        {/* Excerpt */}
        {doc.excerpt && (
          <p style={{ margin: '0 0 14px', fontSize: 14, color: '#71717a', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            <Highlight text={doc.excerpt} query={query} />
          </p>
        )}

        {/* Tags + meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(doc.tags || []).slice(0, 4).map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: '2px 8px', border: '1px solid #27272a',
                borderRadius: 99, color: '#71717a',
              }}>
                <Highlight text={tag} query={query} />
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, color: '#52525b', fontSize: 12 }}>
            {doc.readTime > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIcon /> {doc.readTime} min
              </span>
            )}
            {doc.views > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <EyeIcon /> {doc.views}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

// ── Main Blog page ────────────────────────────────────────
export default function Blog() {
  const [docs, setDocs] = useState([])
  const [searchResults, setSearchResults] = useState(null) // null = not searching
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchDebounce = useRef(null)
  const searchRef = useRef(null)

  // Load docs list
  const loadDocs = useCallback(async (cat = null, pg = 1) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ page: pg, limit: 12 })
      if (cat) params.set('category', cat)
      const res = await fetch(`${API}?${params}`)
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setDocs(data.docs || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load categories
  useEffect(() => {
    fetch(`${API}/categories`)
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => { loadDocs(activeCategory, page) }, [activeCategory, page, loadDocs])

  // Debounced search
  useEffect(() => {
    clearTimeout(searchDebounce.current)
    if (!query.trim()) {
      setSearchResults(null)
      setSearching(false)
      return
    }
    setSearching(true)
    searchDebounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API}/search?q=${encodeURIComponent(query)}&limit=20`)
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setSearchResults(data.docs || [])
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 280)
    return () => clearTimeout(searchDebounce.current)
  }, [query])

  // Cmd+K focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const isSearching = query.trim().length > 0
  const displayed = isSearching ? (searchResults || []) : docs

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', position: 'relative' }}>
      {/* Meteors */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {METEORS.map(m => (
          <span key={m.id} className="meteor"
            style={{ top: m.top, left: m.left, width: m.width, animationDelay: m.delay, animationDuration: m.duration }} />
        ))}
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '96px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,36px)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Blog
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: '#71717a' }}>
              Thoughts, research, and documentation.
            </p>
          </div>

          {/* ── Post your docs button ── */}
          <Link
            to="/blog/write"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 18px',
              background: '#fafafa',
              color: '#09090b',
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'background 0.2s, transform 0.15s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e4e4e7'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Post your docs
          </Link>
        </div>

        {/* ── Powerful Search Bar ── */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            border: `1px solid ${query ? '#3f3f46' : '#27272a'}`,
            borderRadius: 10, padding: '10px 16px',
            background: query ? 'rgba(255,255,255,0.03)' : '#18181b',
            transition: 'border-color 0.2s, background 0.2s',
          }}>
            <span style={{ color: '#52525b', flexShrink: 0, display: 'flex' }}>
              {searching ? <SpinnerIcon /> : <SearchIcon />}
            </span>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search docs, tags, categories… (⌘K)"
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                background: 'none', border: 'none', outline: 'none',
                color: '#fafafa', fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                '::placeholder': { color: '#52525b' },
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', display: 'flex', padding: 0, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
              >
                <XIcon />
              </button>
            )}
          </div>

          {/* Live result count */}
          {isSearching && (
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#52525b' }}>
              {searching ? 'Searching…' : searchResults === null ? '' : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${query}"`}
            </p>
          )}
        </div>

        {/* ── Category filters ── */}
        {!isSearching && categories.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            <button
              onClick={() => { setActiveCategory(null); setPage(1) }}
              style={{
                fontSize: 13, padding: '5px 14px', borderRadius: 99,
                border: `1px solid ${activeCategory === null ? '#52525b' : '#27272a'}`,
                background: activeCategory === null ? '#27272a' : 'transparent',
                color: activeCategory === null ? '#fafafa' : '#71717a',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => { setActiveCategory(cat._id); setPage(1) }}
                style={{
                  fontSize: 13, padding: '5px 14px', borderRadius: 99,
                  border: `1px solid ${activeCategory === cat._id ? '#52525b' : '#27272a'}`,
                  background: activeCategory === cat._id ? '#27272a' : 'transparent',
                  color: activeCategory === cat._id ? '#fafafa' : '#71717a',
                  cursor: 'pointer', transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {cat._id} <span style={{ opacity: 0.5 }}>({cat.count})</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        {loading && !isSearching ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ border: '1px solid #27272a', borderRadius: 12, padding: '20px 24px', background: '#18181b' }}>
                <div style={{ height: 12, width: '30%', background: '#27272a', borderRadius: 4, marginBottom: 12 }} />
                <div style={{ height: 20, width: '70%', background: '#27272a', borderRadius: 4, marginBottom: 10 }} />
                <div style={{ height: 14, width: '90%', background: '#1f1f23', borderRadius: 4 }} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div style={{ border: '1px solid #7f1d1d', borderRadius: 12, padding: 24, background: 'rgba(127,29,29,0.1)', color: '#fca5a5' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Could not connect to backend</p>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>{error} — make sure the server is running at <code style={{ background: '#27272a', padding: '1px 6px', borderRadius: 4 }}>http://localhost:3001</code></p>
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#52525b' }}>
            {isSearching
              ? <><p style={{ fontSize: 16, margin: '0 0 8px' }}>No results found for "{query}"</p><p style={{ fontSize: 14 }}>Try different keywords or check spelling</p></>
              : <><p style={{ fontSize: 16, margin: '0 0 8px' }}>No docs yet</p><p style={{ fontSize: 14 }}>Start writing from the admin panel</p></>}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayed.map((doc, i) => (
                <DocCard key={doc._id || i} doc={doc} query={isSearching ? query : ''} />
              ))}
            </div>

            {/* Pagination — only when not searching */}
            {!isSearching && totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ padding: '8px 16px', border: '1px solid #27272a', borderRadius: 8, background: 'none', color: page === 1 ? '#3f3f46' : '#a1a1aa', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 13 }}
                >
                  ← Prev
                </button>
                <span style={{ padding: '8px 16px', fontSize: 13, color: '#52525b' }}>
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ padding: '8px 16px', border: '1px solid #27272a', borderRadius: 8, background: 'none', color: page === totalPages ? '#3f3f46' : '#a1a1aa', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: 13 }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
