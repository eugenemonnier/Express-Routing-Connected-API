const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true }
})

module.exports = mongoose.model('products', productsSchema)
