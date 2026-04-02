from pathlib import Path
path = Path('src/data/profileDefaults.js')
text = path.read_text()
old = "    playlists: ['Indie electronica for focus', 'Code & Chill Lo-fi', 'Instrumental hip-hop sets', 'Podcasts on DevRel'],\n    toolStack: ['React & Next.js', 'GSAP + Framer Motion', 'Node · Supabase · Prisma'],\n    focus: 'LLM copilots + interactive education',\n  },"
new = "    playlists: ['Indie electronica for focus', 'Code & Chill Lo-fi', 'Instrumental hip-hop sets', 'Podcasts on DevRel'],\n    toolStack: ['React & Next.js', 'GSAP + Framer Motion', 'Node · Supabase · Prisma'],\n    readingList: '\"Creative Selection\" by Ken Kocienda + \"Designing Data-Intensive Applications\"',\n    focus: 'LLM copilots + interactive education',\n  },"
if old not in text:
    raise SystemExit('pattern not found in profile defaults')
path.write_text(text.replace(old, new, 1))
