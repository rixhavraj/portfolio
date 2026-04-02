import mongoose from 'mongoose'

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI || process.env.mongoDB

  if (!dbUri) {
    throw new Error('Missing MongoDB connection string. Set MONGODB_URI.')
  }

  const conn = await mongoose.connect(dbUri)
  console.log(`DB connected: ${conn.connection.host}`)
}
