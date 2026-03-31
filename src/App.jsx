import { useState } from 'react'
import { Navigate, Route, Routes, NavLink } from 'react-router-dom'
import Navbar from './compo/pages/Navbar'
import Home from './compo/pages/Home'
import About from './compo/pages/About'
import Project from './compo/projects/Project'
import Blog from './compo/blog/Blog'
import DocReader from './compo/blog/DocReader'
import DocWriter from './compo/blog/DocWriter'
import Contact from './Contact'
import Admin from './compo/pages/Admin'
import AdminGate from './components/AdminGate'
import CLI from './compo/CLI'

// ── Floating bottom dock (exactly like prasen.dev on inner pages) ── isDark, onToggleDark add this if the theme toggle is working
function BottomDock({ onToggleCLI,  }) {
  const dockItems = [
    {
      label: 'Home', to: '/',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    },
    {
      label: 'Blog', to: '/blog',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    },
    // {
    //   label: 'Videos', to: '/videos',
    //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    // },
    {
      label: 'Projects', to: '/projects',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    },
    // {
    //   label: 'Gadgets', to: '/gadgets',
    //   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M5 5a10 10 0 0 0 0 14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>
    // },
    { label: 'divider' },
    {
      label: 'CLI', onClick: onToggleCLI,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
    },
    // {
    //   label: 'Theme', onClick: onToggleDark,
    //   icon: isDark
    //     ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
    //     : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    // },
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '8px 16px',
      background: 'rgba(24,24,27,0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid #27272a',
      borderRadius: 9999,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      {dockItems.map((item, i) => {
        if (item.label === 'divider') {
          return <div key={i} style={{ width: 1, height: 20, background: '#27272a', margin: '0 4px' }} />
        }
        if (item.onClick) {
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              title={item.label}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#71717a',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; e.currentTarget.style.background = '#27272a'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.background = 'none'; }}
            >
              {item.icon}
            </button>
          )
        }
        return (
          <NavLink
            key={item.label}
            to={item.to}
            title={item.label}
            style={({ isActive }) => ({
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: isActive ? '#fafafa' : '#71717a',
              background: isActive ? '#27272a' : 'none',
              transition: 'color 0.2s, background 0.2s',
            })}
            onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; if (!e.currentTarget.style.background || e.currentTarget.style.background === 'none') e.currentTarget.style.background = '#1f1f23'; }}
            onMouseLeave={e => {
              // keep active state color
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
              e.currentTarget.style.color = isActive ? '#fafafa' : '#71717a'
              e.currentTarget.style.background = isActive ? '#27272a' : 'none'
            }}
          >
            {item.icon}
          </NavLink>
        )
      })}
    </div>
  )
}

// ── App ───────────────────────────────────────────────────
const App = () => {
  const [cliOpen, setCliOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  if (cliOpen) {
    return <CLI onBack={() => setCliOpen(false)} />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      <Navbar
        onToggleCLI={() => setCliOpen(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark(d => !d)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/write" element={<DocWriter />} />
        <Route path="/blog/:slug" element={<DocReader />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <AdminGate>
              <Admin />
            </AdminGate>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Bottom floating dock — visible on all pages except home */}
      <BottomDock
        onToggleCLI={() => setCliOpen(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark(d => !d)}
      />
    </div>
  )
}

export default App
