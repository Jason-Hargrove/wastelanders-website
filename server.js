import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// Routes
import artistsRouter from './routes/artists.js'
import artworksRouter from './routes/artworks.js'
import eventsRouter from './routes/events.js'

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
app.use(cors()) // Eable CORS for all routes
app.use(express.json()) // This allows us to acccept JSON in requests.

// Basic route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Wastelanders API!')
})

//API Routes
app.use('/api/artists', artistsRouter)
app.use('/api/artworks', artworksRouter)
app.use('/api/events', eventsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
