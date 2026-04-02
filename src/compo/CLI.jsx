import { useState, useEffect, useRef } from 'react'

const ASCII_ART = `
 ██████╗ ██╗███████╗██╗  ██╗ █████╗ ██╗   ██╗
 ██╔══██╗██║██╔════╝██║  ██║██╔══██╗██║   ██║
 ██████╔╝██║███████╗███████║███████║██║   ██║
 ██╔══██╗██║╚════██║██╔══██║██╔══██║╚██╗ ██╔╝
 ██║  ██║██║███████║██║  ██║██║  ██║ ╚████╔╝ 
 ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  CLI
`

const COMMANDS = {
  help: () => [
    '  Available commands:',
    '',
    '  about      → Who I am',
    '  skills     → Tech stack',
    '  projects   → Featured work',
    '  experience → Work history',
    '  contact    → Get in touch',
    '  clear      → Clear terminal',
    '  help / ?   → Show this menu',
  ],
  about: () => [
    '  Rishav Raj — Engineer, Designer, Mentor',
    '  Location:  Delhi, India',
    '  Email:     rishavr741@gmail.com',
    '  GitHub:    github.com/rixhavraj',
    '  LinkedIn:  linkedin.com/in/rixhavraj',
    '',
    '  Currently building impactful products for ambitious',
    '  student teams and early-stage startups.',
  ],
  skills: () => [
    '  Frontend   React 19 · Next.js · Vite · GSAP · Tailwind',
    '  Backend    Node.js · Express · REST · Prisma',
    '  Database   Supabase · MongoDB · MySQL · Firebase',
    '  Cloud      Vercel · Docker · CI/CD · AWS',
    '  Other      TypeScript · Git · Figma · WordPress',
  ],
  projects: () => [
    '  ① Tekurious Design System',
    '     Multi-brand component library with MDX docs.',
    '     → https://tekurious.in/',
    '',
    '  ② Campus Compass OS',
    '     Hackathon command center — live leaderboards & CRM.',
    '     → github.com/rixhavraj',
    '',
    '  ③ Scholar Wallet',
    '     Student finance dashboard with gamified budgeting.',
    '     → github.com/rixhavraj',
  ],
  experience: () => [
    '  2026  Freelance Product Engineer (Remote)',
    '        Design systems & GSAP marketing sites.',
    '',
    '  2025  Technical Lead — Campus Innovation Lab (Delhi)',
    '        Led 18 engineers. Scaled to 1.3k monthly users.',
    '',
    '  2024  Community Co-organizer — Hackathons (Greater Noida)',
    '        Hosted 200+ hackers. Built live judging dashboard.',
  ],
  contact: () => [
    '  Email  rishavr741@gmail.com',
    '  GitHub github.com/rixhavraj',
    '  X      x.com/rixhavraj',
    '',
    '  → Open to freelance retainers & Summer 2026 internships.',
  ],
}

export default function CLIMode({ onBack }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    setLines([
      { type: 'art', text: ASCII_ART },
      { type: 'info', text: 'Welcome to my portfolio CLI! 👋' },
      { type: 'info', text: '' },
      { type: 'info', text: 'Type "help" or "?" to see available commands.' },
      { type: 'info', text: '' },
    ])
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines = [...lines, { type: 'input', text: `dev@rishav:~$ ${cmd}` }]

    if (!trimmed) {
      setLines([...newLines])
      return
    }

    if (trimmed === 'clear') {
      setLines([])
      return
    }

    const handler = COMMANDS[trimmed] || COMMANDS['?']
    if (trimmed === '?') {
      const output = COMMANDS.help()
      setLines([...newLines, ...output.map(t => ({ type: 'output', text: t }))])
    } else if (handler) {
      const output = handler()
      setLines([...newLines, ...output.map(t => ({ type: 'output', text: t }))])
    } else {
      setLines([...newLines, { type: 'error', text: `  Command not found: "${trimmed}". Type "help" for available commands.` }])
    }

    setHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(newIdx)
      setInput(history[newIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIdx)
      setInput(newIdx === -1 ? '' : history[newIdx])
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#09090b',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
        fontSize: 14,
        lineHeight: 1.7,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Back button */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#a1a1aa',
            fontSize: 14,
            fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fafafa'}
          onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
        >
          ← Back
        </button>
      </div>

      {/* Terminal output */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
        {lines.map((line, i) => {
          if (line.type === 'art') {
            return (
              <pre key={i} style={{ color: '#fafafa', margin: '0 0 8px', fontSize: 12, lineHeight: 1.3, whiteSpace: 'pre' }}>
                {line.text}
              </pre>
            )
          }
          if (line.type === 'input') {
            return (
              <div key={i} style={{ color: '#a78bfa', whiteSpace: 'pre' }}>
                {line.text}
              </div>
            )
          }
          if (line.type === 'error') {
            return <div key={i} style={{ color: '#f87171', whiteSpace: 'pre' }}>{line.text}</div>
          }
          return (
            <div key={i} style={{ color: line.type === 'info' ? '#a1a1aa' : '#d4d4d8', whiteSpace: 'pre' }}>
              {line.text}
            </div>
          )
        })}

        {/* Input line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 8 }}>
          <span style={{ color: '#a78bfa', userSelect: 'none', whiteSpace: 'nowrap' }}>dev@rishav:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fafafa',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              padding: 0,
              caretColor: '#fafafa',
            }}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
