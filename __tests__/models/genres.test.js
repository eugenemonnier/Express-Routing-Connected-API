const Genres = require('../../src/models/genres')
require('@code-fellows/supergoose')

const genres = new Genres()

describe('Genres model', () => {
  test('create a new artist entry & get return that artist', () => {
    const testGenre = { name: 'R & B' }
    return genres.create(testGenre)
      .then(results => {
        expect(results.name).toBe('R & B')
        return results._id
      })
      .then(results => {
        return genres.read(results)
          .then(results => expect(results[0].name).toBe('R & B'))
      })
  })

  test('read back all entries', () => {
    return genres.read()
      .then(results => {
        expect(results.length).toBe(1)
      })
  })

  test('able to update an artist', () => {
    const testGenre = { name: 'R & B' }
    return genres.create(testGenre)
      .then(results => { return results._id })
      .then(results => {
        return genres.update(results._id, { name: 'Pop' })
          .then(results => expect(results.name).toBe('Pop'))
      })
  })

  test('able to delete an artist', () => {
    const deleteThisGenre = { name: 'Country' }
    return genres.create(deleteThisGenre)
      .then(results => { return results._id })
      .then(results => {
        return genres.delete(results._id)
          .then(results => {
            expect(results.name).toBe('Country')
          })
      })
  })
})
