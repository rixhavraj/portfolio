import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProfile } from '../../context/ProfileContext'

const Home = () => {
  const { profile } = useProfile()
  const { identity, hero, stats, timeline, skillTracks, projects, toolbelt, certifications, testimonial, callToAction } = profile
  const focusList = hero.focusAreas && hero.focusAreas.length ? hero.focusAreas : ['impactful products']
  const containerRef = useRef(null)
  const [focusIndex, setFocusIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFocusIndex((prev) => ((prev + 1) % focusList.length))
    }, 2600)
    return () => clearInterval(timer)
  }, [focusList.length])

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } })
      heroTl.from('[data-hero-item]', { y: 40, opacity: 0, stagger: 0.15 })
      gsap.utils.toArray('[data-section]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        })
      })
      gsap.utils.toArray('[data-floating-card]').forEach((card, idx) => {
        gsap.to(card, {
          y: idx % 2 === 0 ? -18 : 22,
          duration: 3 + idx * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="bg-slate-950 text-white">
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 lg:px-24 overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover opacity-40" src="/3130284-uhd_3840_2160_30fps.mp4" autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-black/70" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6" data-hero-item>
            <p className="text-sm uppercase tracking-[0.5em] text-emerald-300">{identity.name} | {identity.descriptor}</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Building {focusList[focusIndex]} for ambitious student teams and early-stage startups.
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">{hero.summary}</p>
            <div className="flex flex-wrap gap-4" data-hero-item>
              <a href={hero.primaryCta.href} className="px-6 py-3 rounded-full bg-emerald-400 text-slate-950 font-semibold shadow-lg hover:-translate-y-0.5 transition">
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4">
              {stats.slice(0, 2).map((item, idx) => (
                <article
                  key={item.label}
                  data-floating-card
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-2xl backdrop-blur"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="text-4xl font-bold text-emerald-300">{item.value}</p>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </article>
              ))}
              <article className="rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 p-6 shadow-2xl" data-floating-card>
                <p className="text-sm uppercase tracking-[0.3em]">Currently exploring</p>
                <p className="text-2xl font-semibold">{hero.currentlyExploring}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section data-section className="px-6 lg:px-24 py-16 bg-slate-900/60">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Impact snapshot</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">What I have shipped lately</h2>
            <p className="text-slate-300 mt-4 max-w-xl">
              From lightning-fast marketing websites to complex dashboards, my work focuses on narrative-driven storytelling, accessibility, and real metrics.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {stats.map((item) => (
              <article key={item.label} className="rounded-2xl border border-white/10 p-5 bg-slate-950/40">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-section className="px-6 lg:px-24 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Journey</p>
            <h2 className="text-3xl font-bold mb-6">Leadership and learning timeline</h2>
            <div className="space-y-6">
              {timeline.map((item) => (
                <article key={item.year} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <header className="flex items-center justify-between text-sm text-slate-300 mb-2">
                    <span>{item.role}</span>
                    <span>{item.year}</span>
                  </header>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300 mb-3">{item.org}</p>
                  <ul className="space-y-2 text-sm text-slate-200 list-disc pl-4">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {skillTracks.map((skill) => (
              <article key={skill.badge} className="p-6 rounded-2xl border border-white/10 bg-slate-900/70">
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">{skill.badge}</p>
                <h3 className="text-2xl font-semibold">{skill.title}</h3>
                <p className="text-slate-300 text-sm mt-2">{skill.summary}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" style={{ width: `${skill.progress}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Confidence level - {skill.progress}%</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-section className="px-6 lg:px-24 py-20 bg-slate-900/60">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Projects</p>
            <h2 className="text-3xl font-bold">Recent builds</h2>
            <p className="text-slate-300 mt-3 max-w-2xl">Two flagship experiences that combine narrative, realtime data, and subtle motion design.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {toolbelt.map((tool) => (
              <span key={tool} className="text-xs uppercase tracking-wider border border-white/20 px-3 py-1 rounded-full text-slate-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/50">
              <div className="aspect-video bg-black/60">
                <video src={project.media} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">{project.highlight}</span>
                </div>
                <p className="text-slate-300 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                  View case study -{'>'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section data-section className="px-6 lg:px-24 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Certifications</p>
            <h2 className="text-3xl font-bold mb-6">Proof of grind</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <article key={cert.title} className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <header className="flex items-center justify-between text-sm">
                    <span>{cert.title}</span>
                    <span className="text-emerald-300">{cert.year}</span>
                  </header>
                  <p className="text-slate-300 text-sm mt-2">{cert.note}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 space-y-5">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">What others say</p>
            <blockquote className="text-lg text-slate-200 leading-relaxed">"{testimonial.quote}"</blockquote>
            <p className="text-sm text-slate-400">-- {testimonial.author}, {testimonial.role}</p>
          </div>
        </div>
      </section>

      <section data-section className="px-6 lg:px-24 py-20">
        <div className="rounded-3xl border border-emerald-500/50 bg-gradient-to-br from-emerald-600 to-cyan-600 text-slate-950 p-10 space-y-6">
          <p className="text-sm uppercase tracking-[0.4em]">Let's collaborate</p>
          <h2 className="text-4xl font-semibold">{callToAction.title}</h2>
          <p className="text-lg max-w-3xl">{callToAction.body}</p>
          <div className="flex flex-wrap gap-4">
            <a href={callToAction.primary.href} className="px-6 py-3 rounded-full bg-slate-950 text-white font-semibold">
              {callToAction.primary.label}
            </a>
            <a href={callToAction.secondary.href} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-slate-950 text-slate-950">
              {callToAction.secondary.label}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
