import { useProfile } from '../../context/ProfileContext'

function Project() {
  const { profile } = useProfile()
  const { featuredProjects, labs } = profile

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 lg:px-24 pt-24 pb-16">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Case studies</p>
        <h1 className="text-4xl md:text-5xl font-semibold mt-4">Proof that I can ship.</h1>
        <p className="text-slate-300 mt-4">
          These are the projects I reference during interviews and client calls -- each one shipped with telemetry, documentation, and thoughtful polish.
        </p>
      </header>

      <section className="mt-12 grid gap-8">
        {featuredProjects.map((project) => (
          <article key={project.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-slate-300 mt-2 max-w-2xl">{project.description}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">{project.metrics}</span>
            </div>
            <ul className="mt-4 text-sm text-slate-200 list-disc pl-5 space-y-1">
              {project.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6 text-xs text-slate-300">
              {project.stack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full border border-white/15">
                  {tech}
                </span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold mt-6">
              View repository / live build ->
            </a>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Labs and experiments</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {labs.map((lab) => (
            <article key={lab.title} className="p-5 rounded-2xl border border-white/10 bg-slate-900/70">
              <h3 className="text-xl font-semibold">{lab.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{lab.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Project
