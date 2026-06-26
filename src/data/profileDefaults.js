import rishavPhoto from '../assets/rishav.jpg'

export const defaultProfile = {
  identity: {
    name: 'Rishav Raj',
    tagline: 'Tech student. Product engineer. Community builder.',
    descriptor: 'Engineer | Designer | Mentor',
    location: 'Delhi, India',
    email: 'rishavr741@gmail.com',
    photo: rishavPhoto,
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rixhavraj' },
      { label: 'GitHub', url: 'https://github.com/rixhavraj' },
      { label: 'Twitter', url: 'https://x.com/rixhavraj' },
      { label: 'Instagram', url: 'https://www.instagram.com/rixhavraj?igsh=i' },
      { label: 'Case Study', url: 'https://tekurious.in/' },
      { label: 'Buy me a chai', url: 'https://buymeachai.ezee.li/rixhavraj' }
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
      org: 'Delhi, India',
      bullets: [
        'Lead 18 student engineers across AI, IoT, and DevOps pods',
        'Scaled internal tooling from proof-of-concept to 1.3k monthly users',
      ],
    },
    {
      year: '2024',
      role: 'Community Co-organizer -- Hackathons',
      org: 'Greater noida',
      bullets: [
        'Hosted 200+ hackers, curated mentorship content, and secured sponsors',
        'Built judging dashboard with live leaderboards plus Slack automations',
      ],
    },
  ],
  skillTracks: [
    {
      badge: 'Frontend',
      title: 'React Â| Vite Â| Tailwind Â| GSAP',
      progress: 92,
      summary: 'Reusable component libraries, accessibility, scroll-trigger storytelling.',
    },
    {
      badge: 'Backend',
      title: 'Node Â| Express Â| REST Â| Prisma',
      progress: 78,
      summary: 'Secure APIs, API gateway integrations, and Postgres/MySQL operations.',
    },
    {
      badge: 'Cloud & Ops',
      title: 'Vercel Â| Docker Â| CI/CD',
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
      media: 'Screen Recording 2025-09-16 222521.mp4',
      link: 'https://tekurious.in/',
    },
    {
      title: 'Campus Compass OS',
      description: 'Command center for clubs with analytics, sponsor CRM, and real-time event maps.',
      highlight: 'Reduced planning time by 38%',
      stack: ['React', 'GSAP', 'Express', 'MongoDB'],
      media: 'Screen Recording 2025-09-16 224952.mp4',
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
      title: 'Tekurious',
      description: 'Multi-brand component library powering Tekurious marketing microsites with theming plus MDX docs.',
      deliverables: ['Design tokens', 'GSAP micro-interactions', 'Contentful integration'],
      metrics: '65% faster new-page launches',
      stack: ['Wordpress', 'Storybook', 'GSAP', 'Contentful'],
      link: 'https://tekurious.in/',
    },
    {
      title: 'Hostel Websites',
      description: 'Build a full stack hostel website fast, mobile-friendly with rooms, pricing, photos, contact details and a admin panel',
      deliverables: ['Role-based dashboards', 'WebSocket scoring', 'Incident command kit'],
      metrics: 'Handled 200+ concurrent users in 2025 finals',
      stack: ['React', 'Express', 'MongoDB', 'Vercel', 'Framer Motion'],
      link: 'https://hostel-frontend-phi.vercel.app/',
    },
    {
      title: 'Kakashi-Game',
      status:'progress',
      description: 'Build a game',
      deliverables: ['Plaid-style onboarding', 'Progressive disclosure UI', 'Vercel edge functions'],
      metrics: '90% retention across 4-week pilot',
      stack: ['Javascript.js', 'Tailwind', 'Vercel'],
      link: 'https://kakashi-game.vercel.app/',
    },
     {
      title: 'Net Speed',
      description: 'The ultimate net speed and internet speed meter downloader. A beautifully minimal tool that downloads inside your PC and shows your real-time network speed in an always-on-top widget.',
      deliverables: ['Plaid-style onboarding', 'Progressive disclosure UI', 'Vercel edge functions'],
      metrics: '90% retention across 4-week pilot',
      stack: ['Javascript.js', 'Tailwind','cpp','Windows SDK', 'Vercel'],
      link: 'https://rixhavraj.github.io/NetSpeed/',
    },
    {
  title: 'Discord Bot & Server Automation',
  description: 'Developed custom Discord bots and server automation systems for moderation, ticket management, welcome messages, role assignment, logging, slash commands, AI integration, and community management. Built scalable automation to reduce manual administration and improve server engagement.',
  deliverables: [
    'Moderation Bot',
    'Ticket System',
    'Role Automation',
    'Welcome & Logging',
    'AI Chat Integration'
  ],
  metrics: 'Automated server management and reduced manual moderation tasks.',
  stack: [
    'Discord.js',
    'Node.js',
    'JavaScript',
    'Discord API',
    'REST API',
    'Webhooks',
    'AI Integration'
  ],
  link: '',
},
{
  title: 'AI Workflow Automation',
  description: 'Designed intelligent workflow automations using n8n, Gemini AI, Gmail, Google Sheets, Telegram, Discord, and REST APIs. Automated email classification, job opportunity detection, notifications, data extraction, and business workflows to eliminate repetitive manual tasks.',
  deliverables: [
    'Email Automation',
    'Telegram Alerts',
    'Google Sheets Integration',
    'AI Email Classification',
    'Business Workflow Automation'
  ],
  metrics: 'Reduced manual email processing through AI-powered automation workflows.',
  stack: [
    'n8n',
    'Gemini AI',
    'Gmail API',
    'Google Sheets API',
    'Telegram Bot API',
    'REST APIs',
    'OAuth2',
    'JavaScript'
  ],
  link: '#',
},
{
  title: 'Roblox Game Development',
  description: 'Developed Roblox games featuring NPC AI, combat systems, animations, UI, datastore integration, scripting, and multiplayer mechanics using Roblox Studio and Lua.',
  deliverables: [
    'NPC AI',
    'Combat System',
    'Animations',
    'Custom UI',
    'Game Scripting'
  ],
  metrics: 'Built reusable game systems and optimized gameplay mechanics.',
  stack: [
    'Roblox Studio',
    'Lua',
    'Pathfinding',
    'DataStore',
    'RemoteEvents',
    'Game UI'
  ],
  link: '#',
},
{
  title: 'Website & Business Automation',
  description: 'Built automation systems for websites that connect contact forms, CRMs, Google Sheets, AI services, Gmail, Telegram, and third-party APIs to automate lead management and business operations.',
  deliverables: [
    'Lead Capture',
    'CRM Integration',
    'AI Processing',
    'Email Automation',
    'Analytics'
  ],
  metrics: 'Automated lead tracking and business processes across multiple platforms.',
  stack: [
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'n8n',
    'REST APIs',
    'Google Workspace'
  ],
  link: '#',
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
    status: 'Accepting new work for May 2026',
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
