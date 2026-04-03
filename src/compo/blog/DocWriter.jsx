import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DOCS_API } from './apiBase'

const API = DOCS_API
const ADMIN_ALL = `${API}/admin/all`

// ── Icons ─────────────────────────────────────────────────
const SaveIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
const EyeIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const EditIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
const PlusIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>

// ── Markdown preview CSS ───────────────────────────────────
const PREVIEW_CSS = `
.preview-prose { font-size:14px;line-height:1.75;color:#d4d4d8; }
.preview-prose h1,.preview-prose h2,.preview-prose h3 { color:#fafafa;font-weight:700;margin:1.5em 0 0.5em; }
.preview-prose h1{font-size:22px}.preview-prose h2{font-size:18px}.preview-prose h3{font-size:15px}
.preview-prose code { font-family:monospace;font-size:12px;background:#1f1f23;padding:1px 5px;border-radius:3px;color:#a78bfa; }
.preview-prose pre { background:#0d0d0f;border:1px solid #27272a;border-radius:8px;padding:14px 18px;overflow-x:auto;margin:1em 0; }
.preview-prose pre code { background:none;color:#d4d4d8;font-size:13px; }
.preview-prose blockquote { border-left:3px solid #22c55e;margin:1em 0;padding:8px 16px;background:rgba(34,197,94,0.07);border-radius:0 6px 6px 0;color:#a1a1aa; }
.preview-prose ul,.preview-prose ol { padding-left:20px;margin:0 0 1em; }
.preview-prose a { color:#4ade80; }
.preview-prose strong { color:#fafafa; }
.preview-prose p { margin:0 0 1em; }
`

const inputStyle = {
  width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 8,
  padding: '10px 14px', color: '#fafafa', fontSize: 14, fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}
const labelStyle = { fontSize: 12, fontWeight: 600, color: '#71717a', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }

export default function DocWriter() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const [form, setForm] = useState({ title: '', excerpt: '', content: '', tags: '', category: 'general', coverImage: '', published: false })
  const [mode, setMode] = useState('write') // 'write' | 'preview' | 'split'
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [docs, setDocs] = useState([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [tab, setTab] = useState('editor') // 'editor' | 'list'
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [markedLib, setMarkedLib] = useState(null)

  useEffect(() => {
    import('marked').then(m => setMarkedLib(m))
  }, [])

  const loadAllDocs = () => {
    setLoadingDocs(true)
    fetch(ADMIN_ALL)
      .then(r => r.json())
      .then(data => { setDocs(Array.isArray(data) ? data : []); setLoadingDocs(false) })
      .catch(() => setLoadingDocs(false))
  }

  useEffect(() => { loadAllDocs() }, [])

  // Load doc for editing
  useEffect(() => {
    if (!editId) return
    const doc = docs.find(d => d._id === editId)
    if (!doc) return
    // fetch full doc
    fetch(`${API}/${doc.slug}`)
      .then(r => r.json())
      .then(d => {
        setForm({ title: d.title, excerpt: d.excerpt || '', content: d.content || '', tags: (d.tags || []).join(', '), category: d.category || 'general', coverImage: d.coverImage || '', published: d.published })
        setTab('editor')
      })
      .catch(() => {})
  }, [editId, docs])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSave = async (publishNow = null, redirectAfter = false) => {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required')
      return
    }
    setSaving(true)
    setError('')
    const body = {
      ...form,
      published: publishNow !== null ? publishNow : form.published,
    }
    try {
      const url = editId ? `${API}/${editId}` : API
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to save')
      }
      setSaved(true)
      if (!editId) setForm({ title: '', excerpt: '', content: '', tags: '', category: 'general', coverImage: '', published: false })
      loadAllDocs()
      // Redirect to /blog after posting
      if (redirectAfter) {
        setTimeout(() => navigate('/blog'), 600)
      } else {
        setTimeout(() => setSaved(false), 2500)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      setDeleteConfirm(null)
      loadAllDocs()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    }
  }

  const preview = markedLib && form.content ? markedLib.marked(form.content) : ''
  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const CATEGORIES = ['general', 'research', 'guide', 'blog', 'devlog', 'notes']

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', fontFamily: 'Inter, sans-serif' }}>
      <style>{PREVIEW_CSS}</style>

      {/* ── Top bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '10px 24px',
        background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #27272a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* ── Back to Blog button ── */}
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', border: '1px solid #27272a', borderRadius: 7,
              background: 'none', cursor: 'pointer', color: '#71717a',
              fontSize: 13, fontWeight: 500, transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#52525b'; e.currentTarget.style.color = '#fafafa' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 12-14 0M5 12l7-7M5 12l7 7"/>
            </svg>
            Blog
          </button>

          {/* divider */}
          <div style={{ width: 1, height: 18, background: '#27272a' }} />

          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: 2 }}>
            {[['editor', 'Docs Editor'], ['list', 'All Docs']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                background: tab === key ? '#27272a' : 'transparent', color: tab === key ? '#fafafa' : '#71717a',
                transition: 'background 0.15s, color 0.15s',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {tab === 'editor' && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#52525b' }}>{wordCount} words · {readTime} min</span>
            {error && <span style={{ fontSize: 12, color: '#f87171' }}>{error}</span>}
            {saved && <span style={{ fontSize: 12, color: '#4ade80' }}>✓ Saved</span>}

            {/* Mode toggle */}
            <div style={{ display: 'flex', border: '1px solid #27272a', borderRadius: 8, overflow: 'hidden' }}>
              {[['write', <EditIcon />], ['split', '⊞'], ['preview', <EyeIcon />]].map(([m, icon]) => (
                <button key={m} onClick={() => setMode(m)} style={{
                  padding: '5px 10px', border: 'none', cursor: 'pointer', fontSize: 13,
                  background: mode === m ? '#27272a' : 'transparent', color: mode === m ? '#fafafa' : '#71717a',
                  transition: 'background 0.15s',
                }}>{icon}</button>
              ))}
            </div>

            <button onClick={() => handleSave(false)} disabled={saving} style={{
              padding: '7px 14px', border: '1px solid #27272a', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer',
              background: 'transparent', color: '#a1a1aa', fontSize: 13, transition: 'all 0.15s',
            }}>Save Draft</button>
            <button onClick={() => handleSave(true)} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', border: 'none', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer',
              background: '#fafafa', color: '#09090b', fontSize: 13, fontWeight: 600, transition: 'background 0.15s',
            }}>
              <SaveIcon /> {saving ? 'Saving…' : editId ? 'Update & Publish' : 'Publish'}
            </button>
          </div>
        )}
      </div>

      {/* ── Editor Tab ── */}
      {tab === 'editor' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 57px)' }}>
          {/* Sidebar: meta */}
          <div style={{ width: 240, flexShrink: 0, borderRight: '1px solid #27272a', padding: '20px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={set('category')} style={{ ...inputStyle, padding: '8px 12px' }}>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#09090b' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tags <span style={{ opacity: 0.5, textTransform: 'none', fontWeight: 400 }}>(comma separated)</span></label>
              <input value={form.tags} onChange={set('tags')} placeholder="react, research, css" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#3f3f46'} onBlur={e => e.target.style.borderColor = '#27272a'} />
            </div>
            <div>
              <label style={labelStyle}>Excerpt</label>
              <textarea value={form.excerpt} onChange={set('excerpt')} rows={3} placeholder="Short description…" style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = '#3f3f46'} onBlur={e => e.target.style.borderColor = '#27272a'} />
            </div>
            <div>
              <label style={labelStyle}>Cover Image URL</label>
              <input value={form.coverImage} onChange={set('coverImage')} placeholder="https://…" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#3f3f46'} onBlur={e => e.target.style.borderColor = '#27272a'} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 4 }}>
              <input type="checkbox" checked={form.published} onChange={set('published')} style={{ accentColor: '#22c55e' }} />
              <span style={{ fontSize: 13, color: '#a1a1aa' }}>Published</span>
            </label>

            {/* ── POST TO BLOG button ── */}
            <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {error && (
                <p style={{ margin: 0, fontSize: 12, color: '#f87171', textAlign: 'center' }}>{error}</p>
              )}
              {saved && (
                <p style={{ margin: 0, fontSize: 12, color: '#4ade80', textAlign: 'center' }}>✓ Posted! Redirecting…</p>
              )}

              {/* Save Draft — secondary */}
              <button
                onClick={() => handleSave(false, false)}
                disabled={saving}
                style={{
                  width: '100%', padding: '9px 0', border: '1px solid #27272a', borderRadius: 8,
                  background: 'transparent', color: '#71717a', fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.color = '#a1a1aa' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a' }}
              >
                Save Draft
              </button>

              {/* Post to Blog — primary CTA */}
              <button
                onClick={() => handleSave(true, true)}
                disabled={saving}
                style={{
                  width: '100%', padding: '11px 0',
                  border: 'none', borderRadius: 9,
                  background: saving ? '#3f3f46' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: saving ? 'none' : '0 4px 16px rgba(34,197,94,0.3)',
                  transition: 'opacity 0.2s, transform 0.15s',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (!saving) { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {saving ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Posting…
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {editId ? 'Update & Post' : 'Post to Blog'}
                  </>
                )}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>

          {/* Main edit area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Title */}
            <div style={{ padding: '24px 32px 0', borderBottom: '1px solid #1a1a1c' }}>
              <input
                value={form.title}
                onChange={set('title')}
                placeholder="Untitled"
                style={{
                  width: '100%', background: 'none', border: 'none', outline: 'none',
                  fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#fafafa',
                  fontFamily: 'inherit', paddingBottom: 16, letterSpacing: '-0.02em',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Editor / Preview / Split */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {/* Write pane */}
              {(mode === 'write' || mode === 'split') && (
                <div style={{ flex: 1, overflow: 'hidden', borderRight: mode === 'split' ? '1px solid #27272a' : 'none' }}>
                  <textarea
                    value={form.content}
                    onChange={set('content')}
                    placeholder={`Write your doc in Markdown…\n\n# Heading\n\nParagraph with **bold** and _italic_.\n\n\`\`\`js\nconsole.log('code block')\n\`\`\``}
                    style={{
                      width: '100%', height: '100%', background: 'none', border: 'none',
                      outline: 'none', resize: 'none', color: '#d4d4d8',
                      fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: 14,
                      lineHeight: 1.75, padding: '20px 32px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}
              {/* Preview pane */}
              {(mode === 'preview' || mode === 'split') && (
                <div style={{ flex: 1, overflow: 'auto', padding: '20px 32px' }}>
                  {preview
                    ? <div className="preview-prose" dangerouslySetInnerHTML={{ __html: preview }} />
                    : <p style={{ color: '#3f3f46', fontStyle: 'italic' }}>Preview will appear here…</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── All Docs tab ── */}
      {tab === 'list' && (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>All Docs</h2>
            <button onClick={() => { setForm({ title: '', excerpt: '', content: '', tags: '', category: 'general', coverImage: '', published: false }); setTab('editor'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#fafafa', color: '#09090b', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <PlusIcon /> New Doc
            </button>
          </div>

          {loadingDocs ? (
            <p style={{ color: '#52525b' }}>Loading…</p>
          ) : docs.length === 0 ? (
            <p style={{ color: '#52525b', textAlign: 'center', padding: '40px 0' }}>No docs yet. Create your first one!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {docs.map(doc => (
                <div key={doc._id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  border: '1px solid #1f1f23', borderRadius: 8, background: '#09090b',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#27272a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f23'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fafafa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: '#52525b' }}>
                      {new Date(doc.createdAt).toLocaleDateString()} · {doc.category} · {doc.readTime || 0} min
                    </p>
                  </div>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 99,
                    background: doc.published ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.15)',
                    color: doc.published ? '#4ade80' : '#64748b',
                    border: `1px solid ${doc.published ? '#166534' : '#334155'}`,
                  }}>
                    {doc.published ? 'published' : 'draft'}
                  </span>
                  <button onClick={() => { const search = new URLSearchParams({ edit: doc._id }); navigate(`/blog/write?${search}`) }}
                    style={{ padding: '6px', border: '1px solid #27272a', borderRadius: 6, background: 'none', color: '#71717a', cursor: 'pointer', display: 'flex', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
                    title="Edit">
                    <EditIcon />
                  </button>
                  {deleteConfirm === doc._id ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => handleDelete(doc._id)} style={{ padding: '4px 10px', background: '#7f1d1d', border: 'none', borderRadius: 6, color: '#fca5a5', fontSize: 12, cursor: 'pointer' }}>Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} style={{ padding: '4px 10px', background: '#27272a', border: 'none', borderRadius: 6, color: '#a1a1aa', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(doc._id)}
                      style={{ padding: '6px', border: '1px solid #27272a', borderRadius: 6, background: 'none', color: '#71717a', cursor: 'pointer', display: 'flex', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                      onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
                      title="Delete">
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
