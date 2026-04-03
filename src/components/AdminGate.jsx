import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio_admin_unlocked'
const passcode = import.meta.env.ADMIN_PASSCODE?.trim()

const AdminGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!passcode) {
      setError('Set VITE_ADMIN_PASSCODE in your .env file to enable admin access.')
      return
    }
    if (input === passcode) {
      setUnlocked(true)
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
      setError('')
    } else {
      setError('Incorrect passcode. Try again.')
    }
  }

  const handleLock = () => {
    setUnlocked(false)
    setInput('')
    window.sessionStorage.removeItem(STORAGE_KEY)
  }

  if (unlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="px-6 lg:px-24 pt-4 text-right">
          <button onClick={handleLock} className="text-xs uppercase tracking-[0.4em] text-slate-500 hover:text-white">
            Lock admin
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-slate-900/70 border border-white/10 rounded-3xl p-8 space-y-4">
        <h1 className="text-2xl font-semibold">Restricted</h1>
        <p className="text-sm text-slate-400">
          Enter the passcode configured as <code>VITE_ADMIN_PASSCODE</code> to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 focus:border-emerald-400 outline-none"
            placeholder="Passcode"
          />
          <button type="submit" className="w-full py-3 rounded-full bg-emerald-400 text-slate-950 font-semibold">
            Unlock
          </button>
        </form>
        {error && <p className="text-sm text-red-300">{error}</p>}
      </div>
    </div>
  )
}

export default AdminGate
