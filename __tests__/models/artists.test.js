const Artists = require('../../src/models/artists')
require('@code-fellows/supergoose')

const artists = new Artists()

describe('Artists model', () => {
  test('create a new artist entry & get return that artist', () => {
    const testArtist = { name: 'Beyonce' }
    return artists.create(testArtist)
      .then(results => {
        expect(results.name).toBe('Beyonce')
        return results._id
      })
      .then(results => {
        return artists.read(results)
          .then(results => expect(results[0].name).toBe('Beyonce'))
      })
  })

  test('read back all entries', () => {
    return artists.read()
      .then(results => {
        expect(results.length).toBe(1)
      })
  })

  test('able to update an artist', () => {
    const testArtist = { name: 'Beyonce' }
    return artists.create(testArtist)
      .then(results => { return results._id })
      .then(results => {
        return artists.update(results._id, { name: 'Queen B' })
          .then(results => expect(results.name).toBe('Queen B'))
      })
  })

  test('able to delete an artist', () => {
    const deleteThisArtist = { name: 'Creed' }
    return artists.create(deleteThisArtist)
      .then(results => { return results._id })
      .then(results => {
        return artists.delete(results._id)
          .then(results => {
            expect(results.name).toBe('Creed')
          })
      })
  })
})
