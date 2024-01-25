import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { error } from 'console'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

// Middleware
app.use(express.json()) // This allows us to acccept JSON in requests.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
