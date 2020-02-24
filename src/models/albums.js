const Model = require('./mongo-model')
const schema = require('./albums-schema')

class Albums extends Model {
  constructor () {
    super(schema)
  }
}

module.exports = Albums
