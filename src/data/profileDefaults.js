export const defaultProfile = {
  identity: {
    name: 'Rishav Raj',
    tagline: 'Tech student. Product engineer. Community builder.',
    descriptor: 'Engineer | Designer | Mentor',
    location: 'Delhi, India',
    email: 'rishavr741@gmail.com',
    photo: '/IMG-20250720-WA0004[1].jpg',
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rixhavraj' },
      { label: 'GitHub', url: 'https://github.com/rixhavraj' },
      { label: 'Twitter', url: 'https://x.com/rixhavraj' },
      { label: 'Instagram', url: 'https://www.instagram.com/rixhavraj?igsh=i' },
      { label: 'Case Study', url: 'https://tekurious.in/' },
    ],
  },
  hero: {
    focusAreas: ['full-stack systems', 'AI-first prototypes', 'motion-led experiences', 'cloud-native ops'],
    summary:
      'I craft immersive portfolios, design systems, and data-aware dashboards with React, GSAP, and serverless APIs -- turning design jams into production-ready experiences.',
    currentlyExploring: 'LLM copilots + realtime collaboration',
    primaryCta: { label: "Let's build together", href: 'mailto:rishavr741@gmail.com' },
    secondaryCta: { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/rixhavraj' },
  },
  stats: [
    { label: 'Production Builds', value: '14', desc: 'React + WordPress shipping since 2022' },
    { label: 'Hackathon Finals', value: '05', desc: 'AI, fintech, and smart campus challenges' },
    { label: 'Community Hours', value: '120+', desc: 'Mentoring peers and leading workshops' },
    { label: 'Open-Source PRs', value: '36', desc: 'Docs, starter kits, and UI fixes' },
  ],
  timeline: [
    {
      year: '2026',
      role: 'Freelance Product Engineer',
      org: 'Remote',
      bullets: [
        'Design systems plus GSAP-powered marketing sites for early-stage founders',
        'WordPress headless builds with serverless APIs on Vercel',
      ],
    },
    {
      year: '2025',
      role: 'Technical Lead -- Campus Innovation Lab',
      org: 'Bihar, India',
      bullets: [
        'Lead 18 student engineers across AI, IoT, and DevOps pods',
        'Scaled internal tooling from proof-of-concept to 1.3k monthly users',
      ],
    },
    {
      year: '2024',
      role: 'Community Co-organizer -- HackBihar',
      org: 'Patna',
      bullets: [
        'Hosted 200+ hackers, curated mentorship content, and secured sponsors',
        'Built judging dashboard with live leaderboards plus Slack automations',
      ],
    },
  ],
  skillTracks: [
    {
      badge: 'Frontend',
      title: 'React �| Vite �| Tailwind �| GSAP',
      progress: 92,
      summary: 'Reusable component libraries, accessibility, scroll-trigger storytelling.',
    },
    {
      badge: 'Backend',
      title: 'Node �| Express �| REST �| Prisma',
      progress: 78,
      summary: 'Secure APIs, API gateway integrations, and Postgres/MySQL operations.',
    },
    {
      badge: 'Cloud & Ops',
      title: 'Vercel �| Docker �| CI/CD',
      progress: 74,
      summary: 'Preview deployments, telemetry dashboards, and release automation.',
    },
  ],
  projects: [
    {
      title: 'Tech Scholars Network',
      description: 'A social learning hub with personalized dashboards and Notion-style content blocks.',
      highlight: '2.1k monthly active students',
      stack: ['React', 'Node', 'Tailwind', 'Supabase'],
      media: '/Screen Recording 2025-09-16 222521.mp4',
      link: 'https://tekurious.in/',
    },
    {
      title: 'Campus Compass OS',
      description: 'Command center for clubs with analytics, sponsor CRM, and real-time event maps.',
      highlight: 'Reduced planning time by 38%',
      stack: ['React', 'GSAP', 'Express', 'MongoDB'],
      media: '/Screen Recording 2025-09-16 224952.mp4',
      link: 'https://github.com/rixhavraj',
    },
  ],
  toolbelt: ['React 19', 'Next.js', 'GSAP', 'Node.js', 'Supabase', 'Prisma', 'Docker', 'Firebase', 'WordPress Headless'],
  certifications: [
    { title: 'Meta Front-End Certificate', year: '2025', note: 'Advanced UI specialisation plus accessibility badge.' },
    { title: 'AWS Academy Cloud Architecting', year: '2024', note: 'Designed resilient serverless pipelines.' },
    { title: 'Microsoft Imagine Cup Finalist', year: '2023', note: 'AI-powered healthcare assistant prototype.' },
  ],
  testimonial: {
    quote:
      'Rishav pairs design sensitivity with engineering rigor. Every sprint comes with Loom updates, dashboards, and thoughtful code reviews.',
    author: 'Product Mentor',
    role: 'Tekurious Collective',
  },
  callToAction: {
    title: 'Need someone who can ship polished, measurable experiences?',
    body: 'I blend developer-first workflows with storytelling and motion. Whether it is a DevRel microsite, a campus hackathon platform, or your next portfolio revamp -- I am in.',
    primary: { label: 'Send a brief', href: 'mailto:rishavr741@gmail.com' },
    secondary: { label: 'Browse GitHub', href: 'https://github.com/rixhavraj' },
  },
  about: {
    intro:
      'A tech student from Patna building a portfolio of production-ready work -- equal parts storytelling, product strategy, and sharp engineering. I thrive at the intersection of code and communities, whether it is moderating hackathons, revamping club websites, or tutoring the next cohort of builders.',
    interests: [
      {
        title: 'Educational Impact',
        copy: 'Lead peer-to-peer bootcamps that mix design critique, whiteboarding, and code-along labs.',
      },
      {
        title: 'Design + Dev Harmony',
        copy: 'Prototype animations in Figma, then rebuild pixel-perfect flows with GSAP and Tailwind.',
      },
      {
        title: 'Systems Thinking',
        copy: 'From CI pipelines to content modeling, I enjoy creating guardrails that let teams move faster.',
      },
    ],
    playlists: ['Indie electronica for focus', 'Code & Chill Lo-fi', 'Instrumental hip-hop sets', 'Podcasts on DevRel'],
    toolStack: ['React & Next.js', 'GSAP + Framer Motion', 'Node | Supabase | Prisma'],
    readingList: '"Creative Selection" by Ken Kocienda + "Designing Data-Intensive Applications"',
    focus: 'LLM copilots + interactive education',
  },
  featuredProjects: [
    {
      title: 'Tekurious Design System',
      description: 'Multi-brand component library powering Tekurious marketing microsites with theming plus MDX docs.',
      deliverables: ['Design tokens', 'GSAP micro-interactions', 'Contentful integration'],
      metrics: '65% faster new-page launches',
      stack: ['React', 'Storybook', 'GSAP', 'Contentful'],
      link: 'https://tekurious.in/',
    },
    {
      title: 'Campus Compass OS',
      description: 'Operates hackathon schedules, sponsor CRM, and live leaderboards with offline-ready PWA support.',
      deliverables: ['Role-based dashboards', 'WebSocket scoring', 'Incident command kit'],
      metrics: 'Handled 200+ concurrent users in 2025 finals',
      stack: ['React', 'Express', 'MongoDB', 'Redis'],
      link: 'https://github.com/rixhavraj',
    },
    {
      title: 'Scholar Wallet',
      description: 'Finance dashboard for students with gamified budgeting, connected to Razorpay test rails.',
      deliverables: ['Plaid-style onboarding', 'Progressive disclosure UI', 'Vercel edge functions'],
      metrics: '90% retention across 4-week pilot',
      stack: ['Next.js', 'Tailwind', 'Supabase', 'Vercel'],
      link: 'https://github.com/rixhavraj',
    },
  ],
  labs: [
    {
      title: 'LLM Interface Lab',
      summary: 'Exploring guardrailed prompts, realtime collaboration cursors, and AI pair-designers.',
    },
    {
      title: 'Motion Playgrounds',
      summary: 'GSAP ScrollTrigger scenes plus shader experiments to teach animation fundamentals to juniors.',
    },
    {
      title: 'DevRel Starter Kits',
      summary: 'Open-source templates with MDX-ready docs, CLI onboarding, and analytics dashboards.',
    },
  ],
  contact: {
    status: 'Accepting new work for April 2026',
    bullets: [
      'Part-time freelance retainers (8-12 hrs/week)',
      'Summer 2026 internships (Product Engineering / DevRel)',
      'Speaking about React, GSAP, and student leadership',
    ],
    quickLinks: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rixhavraj' },
      { label: 'GitHub', url: 'https://github.com/rixhavraj' },
      { label: 'Twitter', url: 'https://x.com/rixhavraj' },
      { label: 'Latest case study', url: 'https://tekurious.in/' },
    ],
  },
}
