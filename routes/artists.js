import express from 'express'
import Artist from '../models/Artist.js'

const router = express.Router()

//Get all artist
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find()
    res.json(artists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get one artist by id
router.get('/:id', getArtist, (req, res) => {
  res.json(res.artist)
})

//Create a new artist
router.post('/', async (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    bio: req.body.bio,
    profilePicture: req.body.profilePicture,
    socialMediaLinks: req.body.socialMediaLinks,
    website: req.body.website,
  })

  try {
    const newArtist = await artist.save()
    res.status(201).json(newArtist)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update an artist by id
router.put('/:id', getArtist, async (req, res) => {
  if (req.body.name != null) {
    res.artist.name = req.body.name
  }

  if (req.body.bio != null) {
    res.artist.bio = req.body.bio
  }

  if (req.body.profilePicture != null) {
    res.artist.profilePicture = req.body.profilePicture
  }

  if (req.body.socialMediaLinks != null) {
    res.artist.socialMediaLinks = req.body.socialMediaLinks
  }

  if (req.body.website != null) {
    res.artist.website = req.body.website
  }

  // Add checks and updates for other fields as necessary

  try {
    const updatedArtist = await res.artist.save()
    res.json(updatedArtist)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an artist by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id)
    if (!deletedArtist) {
      return res.status(404).json({ message: 'Can not find artist' })
    }
    res.json({ message: 'Deleted Artist', artist: deletedArtist })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Middleware to get artist by ID
async function getArtist(req, res, next) {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    if (artist === null) {
      return res.status(404).json({ message: 'Can not find artist ' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.artist = artist
  next()
}

export default router
