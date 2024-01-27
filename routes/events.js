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

// Update an event by id
router.put('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title
  }

  if (req.body.description != null) {
    res.event.description = req.body.description
  }

  if (req.body.location != null) {
    res.event.location = req.body.location
  }

  if (req.body.date != null) {
    res.event.date = req.body.date
  }

  if (req.body.time != null) {
    res.event.time = req.body.time
  }

  if (req.body.participatingArtists != null) {
    res.event.participatingArtists = req.body.participatingArtists
  }

  // Add checks and updates for other fields as necessary

  try {
    const updatedEvent = await res.event.save()
    res.json(updatedEvent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an event by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id)
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Can not find Event' })
    }
    res.json({ message: 'Deleted Event', event: deletedEvent })
  } catch (error) {
    res.status(500).json({ message: error.message })
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
