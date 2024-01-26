import mongoose from 'mongoose'

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profilePicture: String, // URL to the artist's profile picture
  socialMediaLinks: [String], // List of URLs to social media profiles
  website: String, // URL to the artist's personal website
})

const Artist = mongoose.model('Artist', ArtistSchema)
export default Artist
