import mongoose from 'mongoose'

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  size: String,
  creationDate: Date,
  images: [String], // List of URLs to images of the artwork
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  }, // Reference to the artist who created the artwork
})

const Artwork = mongoose.model('Artwork', ArtworkSchema)
export default Artwork
