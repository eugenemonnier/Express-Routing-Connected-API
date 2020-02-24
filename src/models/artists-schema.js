const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistsSchema = Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  albums: { type: mongoose.Schema.Types.ObjectId, ref: 'albums' }
})

module.exports = mongoose.model('artists', artistsSchema)
