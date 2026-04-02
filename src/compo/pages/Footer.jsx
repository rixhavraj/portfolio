import { useProfile } from '../../context/ProfileContext'

const Footer = () => {
  const { profile } = useProfile()
  const { identity } = profile

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-white px-6 lg:px-24 py-12">
      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">{identity.name}</p>
          <h2 className="text-3xl font-semibold mt-2">{identity.tagline}</h2>
          <p className="text-slate-400 mt-4 max-w-sm">
            Designing ambitious experiences with React, GSAP, and a builder's mindset from {identity.location}.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Contact</p>
          <a href={`mailto:${identity.email}`} className="text-xl font-semibold block mt-3 hover:text-emerald-300">
            {identity.email}
          </a>
          <p className="text-slate-400 text-sm mt-2">Responses within 24 hours - Available for freelance & internships.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Elsewhere</p>
          <ul className="mt-3 space-y-1 text-slate-300">
            {identity.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-white">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Crafted during late-night caffeine sessions.</p>
        <p>Deploy ready - Vercel rewrites configured.</p>
      </div>
    </footer>
  )
}

export default Footer
