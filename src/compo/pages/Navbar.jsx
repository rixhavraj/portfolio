import { NavLink } from 'react-router-dom'

// SVG Icons inline to avoid lucide brand icon issues
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const TerminalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
)
{/*isDark, onToggleDark write this after onToggleCLI if the theme is working */}

function Navbar({ onToggleCLI, }) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'rgba(9,9,11,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #27272a',
      }}
    >
      {/* Home Icon */}
      <NavLink
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 8,
          border: '1px solid #27272a',
          color: '#a1a1aa',
          textDecoration: 'none',
          transition: 'color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; e.currentTarget.style.background = '#27272a'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'transparent'; }}
      >
        <HomeIcon />
      </NavLink>

      {/* Right side nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {['Home','Blog', 'Projects'].map(label => (
          <NavLink
            key={label}
            to={`/${label.toLowerCase()}`}
            style={({ isActive }) => ({
              fontSize: 14,
              color: isActive ? '#fafafa' : '#a1a1aa',
              textDecoration: 'none',
              transition: 'color 0.2s',
            })}
            onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#a1a1aa'; }}
          >
            {label}
          </NavLink>
        ))}

        {/* Divider */}
        <div style={{ width: 1, height: 16, background: '#27272a' }} />

        {/* CLI button */}
        <button
          onClick={onToggleCLI}
          title="Terminal mode"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#a1a1aa',
            padding: 4,
            borderRadius: 6,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#a1a1aa'; }}
        >
          <TerminalIcon />
        </button>

        {/* Theme toggle */}
        {/*
        <button
          onClick={onToggleDark}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#a1a1aa',
            padding: 4,
            borderRadius: 6,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fafafa'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#a1a1aa'; }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        */}
      </nav>
    </header>
  )
}

export default Navbar
