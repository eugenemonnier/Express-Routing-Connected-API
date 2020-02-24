const mongoose = require('mongoose')

const genresSchema = mongoose.Schema({
  name: { type: String }
  // artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artists' }
})

module.exports = mongoose.model('genres', genresSchema)
