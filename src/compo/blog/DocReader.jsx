import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'

const API_BASE = import.meta.env.VITE_API_BASE_URL?.trim() || (import.meta.env.DEV ? 'http://localhost:3001' : '')
const API = `${API_BASE}/api/docs`

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

// ── Icons ────────────────────────────────────────────────
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m19 12-14 0M5 12l7-7M5 12l7 7" />
  </svg>
)
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

// ── Table of contents extraction ─────────────────────────
function extractTOC(markdown) {
  const headings = []
  const lines = markdown.split('\n')
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/[*_`]/g, '')
      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-')
      headings.push({ level, text, id })
    }
  })
  return headings
}

// ── Prose Markdown Styles ────────────────────────────────
const proseCSS = `
.doc-prose {
  font-size: 15px;
  line-height: 1.8;
  color: #d4d4d8;
}
.doc-prose h1,.doc-prose h2,.doc-prose h3,.doc-prose h4 {
  color: #fafafa;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 2em 0 0.7em;
  line-height: 1.3;
  scroll-margin-top: 80px;
}
.doc-prose h1 { font-size: 28px; border-bottom: 1px solid #27272a; padding-bottom: 12px; }
.doc-prose h2 { font-size: 22px; }
.doc-prose h3 { font-size: 18px; }
.doc-prose p { margin: 0 0 1.2em; }
.doc-prose a { color: #4ade80; text-decoration: underline; text-underline-offset: 3px; }
.doc-prose a:hover { color: #86efac; }
.doc-prose code {
  font-family: "JetBrains Mono","Fira Code",monospace;
  font-size: 13px;
  background: #1f1f23;
  border: 1px solid #27272a;
  padding: 1px 6px;
  border-radius: 4px;
  color: #a78bfa;
}
.doc-prose pre {
  background: #0d0d0f;
  border: 1px solid #27272a;
  border-radius: 10px;
  padding: 20px 24px;
  overflow-x: auto;
  margin: 1.5em 0;
}
.doc-prose pre code {
  background: none;
  border: none;
  padding: 0;
  color: #d4d4d8;
  font-size: 13.5px;
  line-height: 1.7;
}
.doc-prose blockquote {
  border-left: 3px solid #22c55e;
  margin: 1.5em 0;
  padding: 12px 20px;
  background: rgba(34,197,94,0.07);
  border-radius: 0 8px 8px 0;
  color: #a1a1aa;
}
.doc-prose ul,.doc-prose ol { padding-left: 24px; margin: 0 0 1.2em; }
.doc-prose li { margin-bottom: 6px; }
.doc-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 14px; }
.doc-prose th { background: #18181b; color: #fafafa; font-weight: 600; text-align: left; padding: 10px 16px; border: 1px solid #27272a; }
.doc-prose td { padding: 10px 16px; border: 1px solid #27272a; color: #a1a1aa; }
.doc-prose tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
.doc-prose img { max-width: 100%; border-radius: 10px; border: 1px solid #27272a; margin: 1.5em 0; }
.doc-prose hr { border: none; border-top: 1px solid #27272a; margin: 2.5em 0; }
.doc-prose strong { color: #fafafa; font-weight: 600; }
`

export default function Docreader() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toc, setToc] = useState([])
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${API}/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error(r.status === 404 ? 'Doc not found' : `Server error ${r.status}`)
        return r.json()
      })
      .then(data => {
        setDoc(data)
        setToc(extractTOC(data.content || ''))
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [slug])

  // Active heading tracking
  useEffect(() => {
    if (!toc.length) return
    const handler = () => {
      for (let i = toc.length - 1; i >= 0; i--) {
        const el = document.getElementById(toc[i].id)
        if (el && el.getBoundingClientRect().top < 120) {
          setActiveHeading(toc[i].id)
          return
        }
      }
      setActiveHeading('')
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [toc])

  const date = doc ? new Date(doc.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  }) : ''

  const htmlContent = doc?.content ? marked(doc.content) : ''

  // Inject IDs to headings in rendered HTML
  const processedHtml = htmlContent.replace(
    /<(h[1-3])>(.*?)<\/h[1-3]>/gi,
    (_, tag, text) => {
      const id = text.replace(/<[^>]+>/g, '').replace(/[^a-z0-9\s]/gi, '').trim().toLowerCase().replace(/\s+/g, '-')
      return `<${tag} id="${id}">${text}</${tag}>`
    }
  )

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      <style>{proseCSS}</style>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', color: '#52525b' }}>
            <svg style={{ animation: 'spin 1s linear infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <p style={{ marginTop: 12, fontSize: 14 }}>Loading…</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : error ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 16, padding: 24 }}>
          <p style={{ fontSize: 20, fontWeight: 600, color: '#f87171' }}>{error}</p>
          <Link to="/blog" style={{ color: '#4ade80', fontSize: 14 }}>← Back to blog</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', maxWidth: 1140, margin: '0 auto', padding: '80px 24px 80px' }}>

          {/* ── Main content ── */}
          <article style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>

            {/* Back + breadcrumb */}
            <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => navigate('/blog')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#71717a', fontSize: 14, padding: 0, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
              >
                <ArrowLeft /> blog
              </button>
              <span style={{ color: '#3f3f46' }}>/</span>
              <span style={{ fontSize: 14, color: '#52525b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {doc.title}
              </span>
            </div>

            {/* Category badge */}
            {doc.category && (
              <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80' }}>
                {doc.category}
              </p>
            )}

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.2, color: '#fafafa' }}>
              {doc.title}
            </h1>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #27272a' }}>
              <span style={{ fontSize: 13, color: '#71717a' }}>{date}</span>
              {doc.readTime > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#71717a' }}>
                  <ClockIcon /> {doc.readTime} min read
                </span>
              )}
              {doc.views > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#71717a' }}>
                  <EyeIcon /> {doc.views.toLocaleString()} views
                </span>
              )}
              {(doc.tags || []).slice(0, 5).map(tag => (
                <Link key={tag} to={`/blog?tag=${tag}`} style={{ textDecoration: 'none' }}>
                  <span style={{ fontSize: 12, padding: '2px 10px', border: '1px solid #27272a', borderRadius: 99, color: '#71717a', transition: 'border-color 0.15s, color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#52525b'; e.currentTarget.style.color = '#a1a1aa' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a' }}>
                    {tag}
                  </span>
                </Link>
              ))}
            </div>

            {/* Body */}
            <div
              className="doc-prose"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
          </article>

          {/* ── Sticky TOC sidebar ── */}
          {toc.length > 1 && (
            <aside style={{
              display: 'none',
              width: 220,
              flexShrink: 0,
              marginLeft: 60,
              // Show on wide screens via inline style workaround
            }}>
              <div style={{ position: 'sticky', top: 80 }}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#52525b', marginBottom: 12 }}>
                  On this page
                </p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {toc.map(h => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      style={{
                        fontSize: 13,
                        paddingLeft: h.level === 1 ? 0 : h.level === 2 ? 12 : 24,
                        padding: `5px ${h.level === 1 ? 0 : h.level === 2 ? 12 : 24}px 5px`,
                        borderLeft: `2px solid ${activeHeading === h.id ? '#22c55e' : 'transparent'}`,
                        color: activeHeading === h.id ? '#4ade80' : '#71717a',
                        textDecoration: 'none',
                        lineHeight: 1.4,
                        transition: 'color 0.15s, border-color 0.15s',
                        display: 'block',
                      }}
                      onMouseEnter={e => { if (activeHeading !== h.id) e.currentTarget.style.color = '#a1a1aa' }}
                      onMouseLeave={e => { if (activeHeading !== h.id) e.currentTarget.style.color = '#71717a' }}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      )}

      {/* ── Responsive TOC inject via style ── */}
      <style>{`
        @media (min-width: 1024px) {
          aside { display: block !important; }
        }
      `}</style>
    </div>
  )
}
