import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './compo/pages/Navbar'
import Home from './compo/pages/Home'
import About from './compo/pages/About'
import Project from './compo/projects/Project'
import Contact from './Contact'
import Footer from './compo/pages/Footer'
import Cards from './compo/Cards'
import Admin from './compo/pages/Admin'
import AdminGate from './components/AdminGate'

const normaliseBaseUrl = (url) => {
  if (!url) return 'http://localhost:3000'
  return url.endsWith('/') ? url.slice(0, -1) : url
}

const CardsGallery = ({ cards, loading, error }) => {
  if (loading) {
    return (
      <section className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
        <p className="text-lg font-medium animate-pulse">Pulling community shout-outs...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-red-950/40 text-red-200 flex flex-col gap-4 items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">We could not reach the student API.</h2>
        <p className="max-w-xl text-sm md:text-base text-red-100/80">
          {error}. Double-check that the backend is running or set <code className="bg-red-900/60 px-2 py-1 rounded">VITE_API_BASE_URL</code> in your
          environment before deploying.
        </p>
      </section>
    )
  }

  if (!cards.length) {
    return (
      <section className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6 text-center">
        <p className="max-w-2xl text-lg">
          No community profiles yet -- hit the API endpoint with a POST request to seed your database and this space will auto-update.
        </p>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Community</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Weekly student spotlight</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Profiles are fetched from your Node backend, so every refresh reflects the most recent submissions.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((person) => (
            <Cards key={`${person.roll_number}-${person.name}`} student={person} />
          ))}
        </div>
      </div>
    </section>
  )
}

const App = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cardsEndpoint = useMemo(() => {
    const baseUrl = normaliseBaseUrl(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000')
    return `${baseUrl}/api/cards`
  }, [])

  useEffect(() => {
    let ignore = false
    const fetchCards = async () => {
      try {
        setLoading(true)
        const res = await fetch(cardsEndpoint, { headers: { 'Content-Type': 'application/json' } })
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const data = await res.json()
        if (!ignore) {
          setCards(Array.isArray(data) ? data : [])
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message)
          setCards([])
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchCards()
    return () => {
      ignore = true
    }
  }, [cardsEndpoint])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          
         {/* <Route path="/cards" element={<CardsGallery cards={cards} loading={loading} error={error} />} /> */}

          <Route
            path="/admin"
            element={
              <AdminGate>
                <Admin />
              </AdminGate>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
