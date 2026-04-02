import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import docsRouter from './routes/docs.js'
import "dotenv/config";

const server = express()
const PORT = process.env.PORT || 3001

// ── Middleware ───────────────────────────────────────────
server.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}))
server.use(express.json({ limit: '5mb' }))
server.use(cookieParser())

// ── Routes ───────────────────────────────────────────────
server.get('/', (req, res) => {
  res.json({ message: `Portfolio API running on port ${PORT}`, version: '2.0' })
})

server.use('/api/docs', docsRouter)

// ── Start ────────────────────────────────────────────────
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("mongoDB connected", connectDB)
    console.log(`✅  Server running at http://localhost:${PORT}`)
    console.log(`📚  Docs API: http://localhost:${PORT}/api/docs`)
  })
})
