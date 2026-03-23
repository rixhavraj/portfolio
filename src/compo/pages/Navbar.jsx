import { NavLink } from 'react-router-dom'
import { useProfile } from '../../context/ProfileContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
  {/*{ label: 'Cards', to: '/cards' }, */}
]

const linkClasses = ({ isActive }) =>
  `text-sm font-medium tracking-wide transition ${
    isActive ? 'text-emerald-300' : 'text-slate-300 hover:text-white'
  }`

function Navbar() {
  const { profile } = useProfile()
  const { identity } = profile

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/RJLOGO.jpg" alt="RR monogram" className="h-10 w-10 rounded-full border border-white/20" />
          <div className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {identity.name}
            <p className="text-[0.6rem] normal-case tracking-[0.2em] text-slate-500">{identity.descriptor}</p>
          </div>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a
          href={`mailto:${identity.email}`}
          className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold shadow hover:-translate-y-0.5 transition"
        >
          Book a call
        </a>
      </div>
    </header>
  )
}

export default Navbar
