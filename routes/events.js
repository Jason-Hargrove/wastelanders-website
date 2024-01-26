import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one event by id
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event)
})

// Create a new event
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
    participatingArtists: req.body.participatingArtists,
  })

  try {
    const newEvent = await event.save()
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Middleware to get event by ID
async function getEvent(req, res, next) {
  let event
  try {
    event = await Event.findById(req.params.id)
    if (event == null) {
      return res.status(404).json({ message: 'Can not find event' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.event = event
  next()
}

export default router
