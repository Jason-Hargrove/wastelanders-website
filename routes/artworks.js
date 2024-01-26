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
    size: req.body.size,
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

router.put('/:id', getArtwork, async (req, res) => {
  if (req.body.title != null) {
    res.artwork.title = req.body.title
  }

  if (req.body.description != null) {
    res.artwork.description = req.body.description
  }

  if (req.body.creationDate != null) {
    res.artwork.creationDate = req.body.creationDate
  }

  if (req.body.images != null) {
    res.artwork.images = req.body.images
  }

  if (req.body.artist != null) {
    res.artwork.artist = req.body.artist
  }

  // Add checks and updates for other fields as necessary

  try {
    const updatedArtwork = await res.artwork.save()
    res.json(updatedArtwork)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an artwork by id
router.delete('/:id', getArtwork, async (req, res) => {
  try {
    await res.artwork.remove()
    res.json({ message: 'Deleted Artwork' })
  } catch (error) {
    res.status(500).json({ message: error.message })
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
