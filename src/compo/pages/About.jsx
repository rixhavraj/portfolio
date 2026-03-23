import { useProfile } from '../../context/ProfileContext'

function About() {
  const { profile } = useProfile()
  const { identity, about } = profile

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 lg:px-24 pt-24 pb-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">About</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-4">Hey, I'm {identity.name}.</h1>
          <p className="text-slate-300 mt-4">{about.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="border border-white/10 rounded-2xl p-5 bg-white/5">
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Location</p>
              <p className="text-xl font-semibold">{identity.location}</p>
              <p className="text-slate-400 text-sm">Remote friendly -- sync friendly for APAC and EMEA.</p>
            </article>
            <article className="border border-white/10 rounded-2xl p-5 bg-white/5">
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Focus now</p>
              <p className="text-xl font-semibold">{about.focus}</p>
              <p className="text-slate-400 text-sm">Exploring guardrails, WebRTC, and AI design partners.</p>
            </article>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Currently reading</p>
          <p className="text-lg">{about.readingList}</p>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Playlists</p>
          <ul className="text-sm text-slate-300 space-y-1">
            {about.playlists.map((playlist) => (
              <li key={playlist}>{playlist}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {about.interests.map((item) => (
          <article key={item.title} className="p-5 rounded-2xl border border-white/10 bg-slate-900/70">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-slate-300 text-sm mt-2">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Tool stack</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {about.toolStack.map((stack) => (
            <article key={stack} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{stack}</h3>
              <p className="text-slate-400 text-sm mt-2">Documented, componentized, and deployed.</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
