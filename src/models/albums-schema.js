const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumsSchema = Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'artists' },
  title: { type: String, required: true }
})

module.exports = mongoose.model('albums', albumsSchema)
