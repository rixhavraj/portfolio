import { useEffect, useRef, useState } from 'react'
import { useProfile } from '../../context/ProfileContext'

// ── Real-time age counter ───────────────────────────────────
const BIRTH_DATE = new Date('2006-09-20T00:00:00')

function AgeCounter() {
  const [age, setAge] = useState('')

  useEffect(() => {
    const tick = () => {
      const ms = Date.now() - BIRTH_DATE.getTime()
      const years = ms / (1000 * 60 * 60 * 24 * 365.25)
      setAge(years.toFixed(9))
    }
    tick()
    const id = setInterval(tick, 50)
    return () => clearInterval(id)
  }, [])

  return <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{age}</span>
}

// ── Animated meteor background ─────────────────────────────
function Meteors({ count = 20 }) {
  const meteors = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      width: `${60 + Math.random() * 80}px`,
    }))
  )

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {meteors.current.map(m => (
        <span
          key={m.id}
          className="meteor"
          style={{
            top: m.top,
            left: m.left,
            width: m.width,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  )
}

// ── Skill icon SVGs (inline) ───────────────────────────────
const SKILL_ICONS = {
  React: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
      <circle cx="12" cy="12" r="2.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  ),
  'Next.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z"/>
    </svg>
  ),
  TypeScript: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3178c6">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  ),
  'Node.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#339933">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072 c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235 l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253 v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
    </svg>
  ),
  MongoDB: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#47A248">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  TailwindCSS: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#06B6D4">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
    </svg>
  ),
  Git: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F05032">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.609-.405-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  'REST APIs': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
    </svg>
  ),
  'Framer Motion': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0055FF">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
    </svg>
  ),
}

// ── Social icon SVGs ────────────────────────────────────────
const SocialIcon = ({ type, href }) => {
  const icons = {
    GitHub: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
    Twitter: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
    LinkedIn: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
    YouTube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>,
    Instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>,
    Steam: <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>,
    CodePen: <path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 0 1-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 0 1-.021.043l-.019.03a.57.57 0 0 1-.08.1l-.026.025a.602.602 0 0 1-.036.03l-.029.022-.05.03-.036.016-.058.018H18.5l-.05.006H5.467l-.056-.006-.062-.014-.045-.016-.058-.027-.038-.026-.033-.024a.97.97 0 0 1-.04-.036l-.026-.025a.57.57 0 0 1-.08-.1l-.019-.03a.78.78 0 0 1-.021-.043l-.014-.03a.57.57 0 0 1-.017-.047l-.01-.031-.011-.053-.005-.028a.568.568 0 0 1-.006-.083v-2.786c0-.028.002-.082.006-.107l.005-.028.011-.053.01-.031c.005-.016.01-.031.017-.047l.014-.03a.78.78 0 0 1 .021-.043l.019-.03a.57.57 0 0 1 .08-.1l.026-.025a.97.97 0 0 1 .04-.036l.029-.022.05-.03.036-.016.058-.018.062-.014.056-.006h13.066l.05.006.062.014.045.016.058.027.038.026.033.024a.97.97 0 0 1 .04.036l.026.025a.57.57 0 0 1 .08.1l.019.03a.78.78 0 0 1 .021.043l.014.03a.57.57 0 0 1 .017.047l.01.031.011.053.005.028c.004.025.006.079.006.107zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33zm-1.276 0l-4.996-.356 4.996 3.33zM6.858 12l-1.594-1.133v2.134zm5.642-4.623L7.504 10.51l1.59 1.128L12 10.equivalent" fill="currentColor"/>
  }
  const d = icons[type]
  if (!d) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={type}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid #27272a',
        color: '#a1a1aa',
        textDecoration: 'none',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#52525b'; e.currentTarget.style.color = '#fafafa'; e.currentTarget.style.background = '#18181b'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'transparent'; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{d}</svg>
    </a>
  )
}

// ── Section heading ────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717a', marginBottom: 8 }}>
      {children}
    </p>
  )
}

// ── Main Home component ────────────────────────────────────
export default function Home() {
  const { profile } = useProfile()
  {/*certifications , timeline, toolbelt*/}
  const { identity, featuredProjects, } = profile

  const skills = [
    { name: 'React', icon: SKILL_ICONS['React'] },
    { name: 'Next.js', icon: SKILL_ICONS['Next.js'] },
    { name: 'TypeScript', icon: SKILL_ICONS['TypeScript'] },
    { name: 'Node.js', icon: SKILL_ICONS['Node.js'] },
    { name: 'MongoDB', icon: SKILL_ICONS['MongoDB'] },
    { name: 'TailwindCSS', icon: SKILL_ICONS['TailwindCSS'] },
    { name: 'Git', icon: SKILL_ICONS['Git'] },
    { name: 'REST APIs', icon: SKILL_ICONS['REST APIs'] },
    { name: 'Framer Motion', icon: SKILL_ICONS['Framer Motion'] },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', position: 'relative' }}>
      <Meteors count={20} />

      {/* Main content container */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, marginBottom: 40, flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
              hey, {identity.name.split(' ')[0]} here
            </h1>
            <p style={{ fontSize: 14, color: '#71717a', fontWeight: 500, margin: 0, fontFamily: 'monospace' }}>
              been on earth for <AgeCounter /> years
            </p>
          </div>

          {/* Profile photo with yellow ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: '#EAB308',
              padding: 3,
              boxShadow: '0 0 0 2px #09090b, 0 0 0 4px #EAB308',
            }}>
              <img
                src={identity.photo}
                alt={identity.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #09090b',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Bio ── */}
        <section style={{ marginBottom: 48, lineHeight: 1.8, color: '#d4d4d8', fontSize: 15 }}>
          <p style={{ margin: '0 0 12px' }}>
            Currently <strong style={{ color: '#fafafa' }}>freelancing</strong> and <strong style={{ color: '#fafafa' }}>collaborating</strong> with new people on exciting projects.
          </p>
          <p style={{ margin: '0 0 12px' }}>
            I love building <a href="https://tekurious.in" target="_blank" rel="noreferrer" style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: '#52525b', textUnderlineOffset: 3 }}>impactful products</a> and share thoughts on tech <a href="https://x.com/rixhavraj" target="_blank" rel="noreferrer" style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: '#52525b', textUnderlineOffset: 3 }}>here</a>.
          </p>
          <p style={{ margin: '0 0 12px' }}>
            Here's what I think about the <a href="#" style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: '#52525b', textUnderlineOffset: 3 }}>future of computer science</a>.
          </p>
          <p style={{ margin: 0 }}>
            I also enjoy <a href="https://github.com/rixhavraj" target="_blank" rel="noreferrer" style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: '#52525b', textUnderlineOffset: 3 }}>open-source</a> in my free time, bullish on AI and future technologies
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
            <SocialIcon type="GitHub" href={identity.socials.find(s => s.label === 'GitHub')?.url || '#'} />
            <SocialIcon type="LinkedIn" href={identity.socials.find(s => s.label === 'LinkedIn')?.url || '#'} />
            <SocialIcon type="Twitter" href={identity.socials.find(s => s.label === 'Twitter')?.url || '#'} />
            <SocialIcon type="Instagram" href={identity.socials.find(s => s.label === 'Instagram')?.url || '#'} />
          </div>
        </section>

        {/* ── Skills ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>Technologies</SectionLabel>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(skill => (
              <span key={skill.name} className="skill-badge">
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* ── Work Experience ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>Career</SectionLabel>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>Work Experience</h2>

          <div style={{ marginTop: 20 }}>
            {/* Work items — styled like prasen.dev with logo, title, dates */}
            {[
              {
                logo: '🔒',
                title: 'Freelance Product Engineer',
                company: 'Self-Employed',
                period: 'Jan 2026 – Present',
                desc: 'Design systems and GSAP-powered marketing sites for early-stage founders.',
              },
              {
                logo: '🚀',
                title: 'Technical Lead',
                company: 'Campus Innovation Lab',
                period: 'Aug 2025 – Dec 2025',
                desc: 'Led 18 student engineers across AI, IoT, and DevOps pods. Scaled tooling to 1.3k monthly users.',
              },
              {
                logo: '💡',
                title: 'Community Co-organizer',
                company: 'Hackathons – Greater Noida',
                period: 'Jan 2024 – Jul 2024',
                desc: 'Hosted 200+ hackers, curated mentorship content, and built live judging dashboards.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="work-item"
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 4 }}
              >
                {/* Logo */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: '1px solid #27272a',
                  background: '#18181b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {item.logo}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fafafa' }}>{item.title}</p>
                      <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>{item.company}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: '#52525b', whiteSpace: 'nowrap' }}>{item.period}</p>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: '#a1a1aa', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GitHub Contributions placeholder ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>Activity</SectionLabel>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.01em' }}>GitHub Contributions</h2>
          <div style={{
            border: '1px solid #27272a',
            borderRadius: 12,
            padding: '24px',
            background: '#18181b',
            textAlign: 'center',
            color: '#52525b',
            fontSize: 13,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              {Array.from({ length: 52 }).map((_, week) => (
                <div key={week} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {Array.from({ length: 7 }).map((_, day) => {
                    const intensity = Math.random()
                    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                    const color = intensity < 0.6 ? colors[0] : intensity < 0.75 ? colors[1] : intensity < 0.85 ? colors[2] : intensity < 0.93 ? colors[3] : colors[4]
                    return (
                      <div key={day} style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
                    )
                  })}
                </div>
              ))}
            </div>
            <p style={{ marginTop: 12, marginBottom: 0 }}>
              <a href={identity.socials.find(s => s.label === 'GitHub')?.url} target="_blank" rel="noreferrer" style={{ color: '#71717a', fontSize: 12, textDecoration: 'none' }}>
                View on GitHub →
              </a>
            </p>
          </div>
        </section>

        {/* ── Featured Projects ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>Work</SectionLabel>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Featured Projects</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {featuredProjects.map((proj, i) => (
              <a
                key={i}
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  padding: '14px 16px',
                  margin: '0 -16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Project screenshot/thumbnail */}
                <div style={{
                  width: 64,
                  height: 40,
                  borderRadius: 6,
                  border: '1px solid #27272a',
                  background: '#18181b',
                  flexShrink: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {i === 0 ? '🎨' : i === 1 ? '🧭' : '💰'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fafafa' }}>{proj.title}</p>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: '#71717a', lineHeight: 1.5 }}>{proj.description}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {proj.stack.map(s => (
                      <span key={s} style={{ fontSize: 11, padding: '2px 8px', border: '1px solid #27272a', borderRadius: 4, color: '#71717a' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 12, paddingLeft: 16 }}>
            <a href="/projects" style={{ fontSize: 13, color: '#71717a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
              onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
            >
              View All Projects →
            </a>
          </div>
        </section>

        {/* ── Education ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>Learning</SectionLabel>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Education</h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { logo: '🎓', name: 'Delhi Technological University', degree: 'B.Tech Computer Science', period: '2022 – 2026' },
              { logo: '📚', name: 'Meta Front-End Professional', degree: 'Meta Certification', period: '2025' },
              { logo: '☁️', name: 'AWS Academy', degree: 'Cloud Architecting', period: '2024' },
            ].map((edu, i) => (
              <div
                key={i}
                className="work-item"
                style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 4 }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: '1px solid #27272a',
                  background: '#18181b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {edu.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fafafa' }}>{edu.name}</p>
                      <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>{edu.degree}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: '#52525b' }}>{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer / Contact ── */}
        <footer style={{ borderTop: '1px solid #27272a', paddingTop: 48 }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 300 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                Thanks for all of your love 💖
              </h3>
              <p style={{ color: '#71717a', fontSize: 14, margin: '0 0 20px' }}>I'd love to hear from you.</p>
              <a
                href={`mailto:${identity.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  background: '#fafafa',
                  color: '#09090b',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e4e4e7'}
                onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#EAB308',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  overflow: 'hidden',
                }}>
                  <img src={identity.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                Let's talk
              </a>

              <p style={{ fontSize: 12, color: '#52525b', marginTop: 32, lineHeight: 1.8 }}>
                {identity.name}<br />
                Frontend Developer from India.<br />
                Building modern web applications.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 48 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: 16 }}>Links</p>
                {['Blog', 'Projects'].map(link => (
                  <div key={link} style={{ marginBottom: 8 }}>
                    <a href={`/${link.toLowerCase()}`} style={{ color: '#a1a1aa', fontSize: 14, textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
                      onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
                    >{link}</a>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: 16 }}>Meta</p>
                {[
                  { label: 'Sitemap', href: '/sitemap.xml' },
                  { label: 'RSS Feed', href: '/rss.xml' },
                  { label: 'Source Code', href: identity.socials.find(s => s.label === 'GitHub')?.url || '#' },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: 8 }}>
                    <a href={item.href} style={{ color: '#a1a1aa', fontSize: 14, textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
                      onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
                    >{item.label}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ marginTop: 48, fontSize: 12, color: '#52525b' }}>
            © 2026 {identity.name}. Open source under{' '}
            <a href="https://opensource.org/licenses/MIT" style={{ color: '#71717a', textDecoration: 'underline' }}>RJ</a>
          </p>
        </footer>
      </div>

      //Search button — bottom right
      {/*
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
        onClick={() => {}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>Search</span>
        <span style={{ padding: '1px 5px', background: '#27272a', borderRadius: 4, fontSize: 11 }}>⌘K</span>
      </button>
      */}
    </div>
  )
}
