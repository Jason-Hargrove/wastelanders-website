import express from 'express'
import Artwork from '../models/Artwork.js'

const router = express.Router()

// Get all artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find()
    res.json(artworks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one artwork by id
router.get('/:id', getArtwork, (req, res) => {
  res.json(res.artwork)
})

// Create a new artwork
router.post('/', async (req, res) => {
  const artwork = new Artwork({
    title: req.body.title,
    description: req.body.description,
    creationDate: req.body.creationDate,
    images: req.body.images,
    artist: req.body.artist,
  })

  try {
    const newArtwork = await artwork.save()
    res.status(201).json(newArtwork)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Middleware to get artwork by ID
async function getArtwork(req, res, next) {
  let artwork
  try {
    artwork = await Artwork.findById(req.params.id)
    if (artwork == null) {
      return res.status(404).json({ message: 'Can not find artwork' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.artwork = artwork
  next()
}

export default router
