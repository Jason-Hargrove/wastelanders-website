import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Import your routes here if you have them in separate files
// e.g., import artistsRouter from './routes/artists.js';

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

// Basic route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Wastelanders API!')
})

//API Routes
// e.g., app.use('/api/artist', artistsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
