import { useEffect, useMemo, useState } from 'react'
import { useProfile } from '../../context/ProfileContext'
import { defaultProfile } from '../../data/profileDefaults'

const JsonEditor = ({ label, value, onSave, description }) => {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2))
  const [status, setStatus] = useState('')

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2))
  }, [value])

  const handleSave = () => {
    try {
      const parsed = JSON.parse(draft)
      onSave(parsed)
      setStatus('Saved')
      setTimeout(() => setStatus(''), 2000)
    } catch (err) {
      setStatus(`Invalid JSON: ${err.message}`)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
      <div>
        <h3 className="text-lg font-semibold">{label}</h3>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={8}
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 font-mono text-xs text-white"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
        >
          Save
        </button>
        {status && <p className="text-xs text-slate-300">{status}</p>}
      </div>
    </div>
  )
}

const linesFromSocials = (socials = []) => socials.map((item) => `${item.label}|${item.url}`).join('\n')

const Admin = () => {
  const { profile, setProfile, updateSection, resetProfile } = useProfile()
  const [socialDraft, setSocialDraft] = useState(linesFromSocials(profile.identity.socials))
  const [toolbeltDraft, setToolbeltDraft] = useState(profile.toolbelt.join('\n'))
  const [playlistsDraft, setPlaylistsDraft] = useState(profile.about.playlists.join('\n'))
  const [contactLinksDraft, setContactLinksDraft] = useState(linesFromSocials(profile.contact.quickLinks))
  const [contactBulletsDraft, setContactBulletsDraft] = useState(profile.contact.bullets.join('\n'))

  useEffect(() => {
    setSocialDraft(linesFromSocials(profile.identity.socials))
  }, [profile.identity.socials])

  useEffect(() => {
    setToolbeltDraft(profile.toolbelt.join('\n'))
  }, [profile.toolbelt])

  useEffect(() => {
    setPlaylistsDraft(profile.about.playlists.join('\n'))
  }, [profile.about.playlists])

  useEffect(() => {
    setContactLinksDraft(linesFromSocials(profile.contact.quickLinks))
    setContactBulletsDraft(profile.contact.bullets.join('\n'))
  }, [profile.contact])

  const applySocials = () => {
    const nextSocials = socialDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url = ''] = line.split('|')
        return { label: label.trim(), url: url.trim() }
      })
    setProfile((prev) => ({ ...prev, identity: { ...prev.identity, socials: nextSocials } }))
  }

  const applyToolbelt = () => {
    const nextToolbelt = toolbeltDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    updateSection('toolbelt', nextToolbelt)
  }

  const applyPlaylists = () => {
    const nextPlaylists = playlistsDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    setProfile((prev) => ({ ...prev, about: { ...prev.about, playlists: nextPlaylists } }))
  }

  const applyContact = () => {
    const quickLinks = contactLinksDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url = ''] = line.split('|')
        return { label: label.trim(), url: url.trim() }
      })
    const bullets = contactBulletsDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    setProfile((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        quickLinks,
        bullets,
      },
    }))
  }

  const exportProfile = useMemo(() => JSON.stringify(profile, null, 2), [profile])

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 lg:px-24 pt-24 pb-16 space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Admin</p>
        <h1 className="text-4xl font-semibold">Profile Control Center</h1>
        <p className="text-slate-300 max-w-3xl">
          Update every piece of copy or data that powers the public portfolio. Changes are stored in localStorage so you can
          experiment safely before shipping to production.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetProfile}
            className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-sm"
          >
            Reset to defaults
          </button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
          <h2 className="text-xl font-semibold">Identity</h2>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Name</label>
          <input
            value={profile.identity.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, name: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Tagline</label>
          <input
            value={profile.identity.tagline}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, tagline: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Descriptor</label>
          <input
            value={profile.identity.descriptor}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, descriptor: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Location</label>
          <input
            value={profile.identity.location}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, location: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</label>
          <input
            value={profile.identity.email}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, email: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Photo URL</label>
          <input
            value={profile.identity.photo ?? ''}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, identity: { ...prev.identity, photo: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
            placeholder="/IMG-20250720-WA0004[1].jpg"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
          <h2 className="text-xl font-semibold">Hero section</h2>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Hero summary</label>
          <textarea
            value={profile.hero.summary}
            onChange={(e) => setProfile((prev) => ({ ...prev, hero: { ...prev.hero, summary: e.target.value } }))}
            rows={4}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Focus areas (comma separated)</label>
          <input
            value={profile.hero.focusAreas.join(', ')}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                hero: { ...prev.hero, focusAreas: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) },
              }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Currently exploring</label>
          <input
            value={profile.hero.currentlyExploring}
            onChange={(e) => setProfile((prev) => ({ ...prev, hero: { ...prev.hero, currentlyExploring: e.target.value } }))}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Primary CTA label</label>
              <input
                value={profile.hero.primaryCta.label}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, primaryCta: { ...prev.hero.primaryCta, label: e.target.value } },
                  }))
                }
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Primary CTA link</label>
              <input
                value={profile.hero.primaryCta.href}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, primaryCta: { ...prev.hero.primaryCta, href: e.target.value } },
                  }))
                }
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Secondary CTA label</label>
              <input
                value={profile.hero.secondaryCta.label}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, secondaryCta: { ...prev.hero.secondaryCta, label: e.target.value } },
                  }))
                }
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Secondary CTA link</label>
              <input
                value={profile.hero.secondaryCta.href}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, secondaryCta: { ...prev.hero.secondaryCta, href: e.target.value } },
                  }))
                }
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">Social links</h2>
          <p className="text-xs text-slate-400">Enter one item per line as Label|https://url</p>
          <textarea
            value={socialDraft}
            onChange={(e) => setSocialDraft(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 font-mono text-xs"
          />
          <button
            type="button"
            onClick={applySocials}
            className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Update socials
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">Toolbelt</h2>
          <p className="text-xs text-slate-400">One skill per line</p>
          <textarea
            value={toolbeltDraft}
            onChange={(e) => setToolbeltDraft(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 font-mono text-xs"
          />
          <button
            type="button"
            onClick={applyToolbelt}
            className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Update toolbelt
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">About copy</h2>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Intro</label>
          <textarea
            value={profile.about.intro}
            onChange={(e) => setProfile((prev) => ({ ...prev, about: { ...prev.about, intro: e.target.value } }))}
            rows={5}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Current focus</label>
          <input
            value={profile.about.focus}
            onChange={(e) => setProfile((prev) => ({ ...prev, about: { ...prev.about, focus: e.target.value } }))}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">Playlists</h2>
          <p className="text-xs text-slate-400">One entry per line</p>
          <textarea
            value={playlistsDraft}
            onChange={(e) => setPlaylistsDraft(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 font-mono text-xs"
          />
          <button
            type="button"
            onClick={applyPlaylists}
            className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Update playlists
          </button>
        </div>
      </section>

      <JsonEditor
        label="Stats"
        value={profile.stats}
        onSave={(value) => updateSection('stats', value)}
        description='Array of { "label", "value", "desc" } objects.'
      />
      <JsonEditor
        label="Timeline"
        value={profile.timeline}
        onSave={(value) => updateSection('timeline', value)}
        description='Array of { "year", "role", "org", "bullets": [] } objects.'
      />
      <JsonEditor
        label="Skill tracks"
        value={profile.skillTracks}
        onSave={(value) => updateSection('skillTracks', value)}
      />
      <JsonEditor
        label="Home projects"
        value={profile.projects}
        onSave={(value) => updateSection('projects', value)}
      />
      <JsonEditor
        label="Certifications"
        value={profile.certifications}
        onSave={(value) => updateSection('certifications', value)}
      />
      <JsonEditor
        label="Featured projects page"
        value={profile.featuredProjects}
        onSave={(value) => updateSection('featuredProjects', value)}
      />
      <JsonEditor label="Labs" value={profile.labs} onSave={(value) => updateSection('labs', value)} />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">Contact status</h2>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Headline</label>
          <input
            value={profile.contact.status}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, contact: { ...prev.contact, status: e.target.value } }))
            }
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
          />
          <p className="text-xs text-slate-400">One bullet per line</p>
          <textarea
            value={contactBulletsDraft}
            onChange={(e) => setContactBulletsDraft(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 font-mono text-xs"
          />
          <button
            type="button"
            onClick={applyContact}
            className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Update status
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
          <h2 className="text-xl font-semibold">Contact quick links</h2>
          <p className="text-xs text-slate-400">Label|https://url per line</p>
          <textarea
            value={contactLinksDraft}
            onChange={(e) => setContactLinksDraft(e.target.value)}
            rows={8}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 font-mono text-xs"
          />
          <button
            type="button"
            onClick={applyContact}
            className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Update quick links
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-xl font-semibold">Export / backup</h2>
        <p className="text-xs text-slate-400">
          Copy the JSON snapshot below and store it safely. You can paste it back into localStorage for quick migrations.
        </p>
        <textarea readOnly rows={10} value={exportProfile} className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 font-mono text-xs" />
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(exportProfile)}
          className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold"
        >
          Copy to clipboard
        </button>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-xl font-semibold">Defaults reference</h2>
        <p className="text-xs text-slate-400">Use this snippet if you ever need to reset manually.</p>
        <textarea
          readOnly
          rows={10}
          value={JSON.stringify(defaultProfile, null, 2)}
          className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 font-mono text-xs"
        />
      </section>
    </div>
  )
}

export default Admin
