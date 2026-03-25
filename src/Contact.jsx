import { useState } from 'react'
import { useProfile } from './context/ProfileContext'

function Contact() {
  const { profile } = useProfile()
  const { identity, contact } = profile
  const baseForm = { name: '', email: '', project: 'Website redesign', message: '' }
  const [formState, setFormState] = useState(baseForm)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, project, message } = formState
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project}\nMessage: ${message}`)
    window.location.href = `mailto:${identity.email}?subject=Project Inquiry: ${encodeURIComponent(project)}&body=${body}`
    setStatus('Draft email opened in your inbox. Feel free to edit before sending!')
    setFormState(baseForm)
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 lg:px-24 pt-24 pb-16">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Let's jam</p>
        <h1 className="text-4xl md:text-5xl font-semibold mt-4">Tell me about your next build.</h1>
        <p className="text-slate-300 mt-4">
          Available for freelance engagements, hackathon mentoring, and internships. Based in {identity.location} -- I reply within 24 hours.
        </p>
      </header>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5">
          <div>
            <label htmlFor="name" className="text-sm text-slate-300 block mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 focus:border-emerald-400 outline-none"
              placeholder="Ada Lovelace"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-slate-300 block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 focus:border-emerald-400 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="project" className="text-sm text-slate-300 block mb-2">
              Project focus
            </label>
            <select
              id="project"
              name="project"
              value={formState.project}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 focus:border-emerald-400 outline-none"
            >
              <option>Website Development</option>
              <option>App Development</option>
              <option>UI/UX Design</option>
              <option>Cybersecurity</option>
              <option>App and website testing</option>
              <option>WordPress Development</option>
              <option>Video Editing</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-slate-300 block mb-2">
              What challenge are we solving?
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 focus:border-emerald-400 outline-none"
              placeholder="A short brief, desired timeline, or vibe check."
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-emerald-400 text-slate-950 font-semibold">
            Generate intro email
          </button>
          {status && <p className="text-xs text-emerald-300">{status}</p>}
        </form>

        <div className="space-y-6">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Status</p>
            <h2 className="text-2xl font-semibold mt-2">{ }</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc pl-5">
              {contact.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Quick links</p>
            <div className="mt-3 space-y-2 text-sm">
              {contact.quickLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="flex justify-between hover:text-emerald-300">
                  {link.label} <span>&rarr;</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Contact
