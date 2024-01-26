import express from 'express'
import Artist from '../models/Artist'

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
