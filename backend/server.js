import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import docsRouter from './routes/docs.js'
import 'dotenv/config'

const server = express()
const PORT = process.env.PORT || 3001

const localOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']
const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const allowedOrigins = new Set([...localOrigins, ...envOrigins])

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
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
      console.log(`Server running at http://localhost:${PORT}`)
      console.log(`Docs API: http://localhost:${PORT}/api/docs`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  })