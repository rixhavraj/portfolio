import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ── Meteor background (reused from Home) ──────────────────
const meteors = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
  width: `${60 + Math.random() * 80}px`,
}))

// Globe icon
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// GitHub icon
const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

// ── Project data ──────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Tekurious Design System',
    period: 'Jan 2026 – Present',
    description: 'Multi-brand component library powering Tekurious marketing microsites with theming plus MDX docs. Built with Storybook integration for rapid prototyping.',
    website: 'https://tekurious.in/',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '🎨',
    color: '#7c3aed',
  },
  {
    title: 'Campus Compass OS',
    period: 'Aug 2025 – Dec 2025',
    description: 'Hackathon command center for clubs with analytics, sponsor CRM, real-time event maps, and live leaderboards with offline-ready PWA support.',
    website: 'https://tekurious.in/',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '🧭',
    color: '#0e7490',
  },
  {
    title: 'Scholar Wallet',
    period: 'Mar 2025 – Jun 2025',
    description: 'Finance dashboard for students with gamified budgeting, connected to Razorpay test rails. Features Plaid-style onboarding and progressive disclosure UI.',
    website: 'https://github.com/rixhavraj',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '💰',
    color: '#065f46',
  },
  {
    title: 'RPH Hostel Management',
    period: 'Nov 2024 – Feb 2025',
    description: 'Full-stack hostel management system with room booking, admin panel, Cloudinary image uploads, and real-time availability tracking.',
    website: 'https://github.com/rixhavraj',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '🏠',
    color: '#92400e',
  },
  {
    title: 'SmileCare Dental Website',
    period: 'Sep 2024 – Oct 2024',
    description: 'Modern, professional, and conversion-focused dental clinic website with appointment booking, admin management, and responsive UI built with React and TailwindCSS.',
    website: 'https://github.com/rixhavraj',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '🦷',
    color: '#1e3a5f',
  },
  {
    title: 'LLM Interface Lab',
    period: 'Jan 2024 – Present',
    description: 'Exploring guardrailed prompts, realtime collaboration cursors, and AI pair-designers. Open-source research playground for LLM UX patterns.',
    website: 'https://github.com/rixhavraj',
    source: 'https://github.com/rixhavraj',
    image: null,
    emoji: '🤖',
    color: '#312e81',
  },
]

// ── Project Card ──────────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #27272a',
        background: '#09090b',
        transition: 'border-color 0.2s',
        borderColor: hovered ? '#3f3f46' : '#27272a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image / Preview */}
      <div style={{
        aspectRatio: '16/9',
        background: project.color || '#18181b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <>
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 30% 40%, ${project.color}80 0%, transparent 70%)`,
            }} />
            <span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
              {project.emoji}
            </span>
          </>
        )}

        {/* Green bottom bar on hover — like prasen.dev */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(to right, #22c55e, #16a34a)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Title */}
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#fafafa', letterSpacing: '-0.01em' }}>
          {project.title}
        </h2>

        {/* Date */}
        <p style={{ margin: 0, fontSize: 13, color: '#71717a', fontWeight: 400 }}>
          {project.period}
        </p>

        {/* Description */}
        <p style={{
          margin: '4px 0 0',
          fontSize: 14,
          color: '#a1a1aa',
          lineHeight: 1.6,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <a
            href={project.website}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              border: '1px solid #27272a',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              color: '#fafafa',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#18181b'; e.currentTarget.style.borderColor = '#3f3f46'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#27272a'; }}
          >
            <GlobeIcon /> Website
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              border: '1px solid #27272a',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              color: '#fafafa',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#18181b'; e.currentTarget.style.borderColor = '#3f3f46'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#27272a'; }}
          >
            <GitHubIcon /> Source
          </a>
        </div>
      </div>
    </article>
  )
}

// ── Main Projects page ────────────────────────────────────
export default function Project() {
  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', position: 'relative' }}>
      {/* Meteor background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {meteors.map(m => (
          <span
            key={m.id}
            className="meteor"
            style={{ top: m.top, left: m.left, width: m.width, animationDelay: m.delay, animationDuration: m.duration }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '96px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* Page title — lowercase, just like prasen.dev */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 36px)',
          fontWeight: 700,
          margin: '0 0 40px',
          letterSpacing: '-0.02em',
          color: '#fafafa',
        }}>
          projects
        </h1>

        {/* 2-column project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          gap: 20,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>

      {/* Search button — bottom right */}
      <button
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: '#18181b',
          border: '1px solid #27272a',
          borderRadius: 8,
          color: '#71717a',
          fontSize: 13,
          cursor: 'pointer',
          zIndex: 40,
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#52525b'; e.currentTarget.style.color = '#a1a1aa'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#71717a'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>Search</span>
        <span style={{ padding: '1px 5px', background: '#27272a', borderRadius: 4, fontSize: 11 }}>⌘K</span>
      </button>
    </div>
  )
}
