import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String, // Physical location of the URL if it's an onlie event
  date: Date,
  time: String,
  participatingArtists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
    },
  ], // List of artists participating in the event
})

const Event = mongoose.model('Event', EventSchema)
export default Event
