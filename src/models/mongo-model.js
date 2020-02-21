class Model {
  constructor (schema) {
    this.schema = schema
  }

  create (record) {
    const newRecord = new this.schema (record)
    return newRecord.save()
  }

  read (id) {
    const queryObj = id ? { _id: id } : {}
    return this.schema.find(queryObj)
  }

  update (id, record) {
    return this.schema.findByIdAndUpdate(id, record)
  }

  delete (id) {
    return this.schema.findByIdAndDelete(id)
  }
}

module.exports = Model
