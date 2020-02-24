const Model = require('./mongo-model')
const schema = require('./genres-schema')

class Genres extends Model {
  constructor () {
    super(schema)
  }
}

module.exports = Genres
