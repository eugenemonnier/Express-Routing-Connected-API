const Model = require('./mongo-model')
const schema = require('./artists-schema')

class Artists extends Model {
  constructor () {
    super(schema)
  }
}

module.exports = Artists
