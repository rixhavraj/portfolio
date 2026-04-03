import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import docsRouter from './routes/docs.js'
import 'dotenv/config'

const server = express()
const PORT = process.env.PORT || 3001
const frontend = process.env.FRONTEND_URL || ''
const backend = process.env.BACKEND_URL || ''

const normalizeOrigin = (url = '') => url.trim().replace(/\/+$/, '')
const parseOrigins = (...values) =>
  values
    .flatMap((value) => String(value || '').split(','))
    .map(normalizeOrigin)
    .filter(Boolean)

const localOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000, frontend']
const envOrigins = parseOrigins(frontend, backend)

const allowedOrigins = new Set([...parseOrigins(...localOrigins), ...envOrigins])

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.has(normalizeOrigin(origin))) {
        return callback(null, true)
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  })
)

server.use(express.json({ limit: '5mb' }))
server.use(cookieParser())

server.get('/', (req, res) => {
  res.json({ message: `Portfolio API running on port ${PORT}`, version: '2.0' })
})

server.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

server.use('/api/docs', docsRouter)

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log('MongoDB connected')
      console.log(`Server running at port ${PORT}`)
      console.log(`Docs API: http://localhost:${PORT}/api/docs`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  })
