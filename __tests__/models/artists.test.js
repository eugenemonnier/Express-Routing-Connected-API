const Artists = require('../../src/models/artists')
const Albums = require('../../src/models/albums')
require('@code-fellows/supergoose')

const albums = new Albums()
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
          .then(results => expect(results[0].name.toBe('Beyonce')))
      })
  })

  test('read back all entries', () => {
    return artists.read()
      .then(results => {
        expect(results.length).toBe(5)
      })
  })

  test('able to update an artist and read back an artist\'s album', () => {
    const testArtist = { name: 'Beyonce' }
    let artistId = ''
    return artists.create(testArtist)
      .then(results => {
        artistId = results._id
        return artistId
      })
      .then(results => {
        return albums.create({ artist: results._id, name: 'Lemonade' })
          .then(results => {
            return artists.update(artistId, { name: 'Beyonce', albums: results._id })
              .then(results => expect(results.albums.name).toBe('Lemonade'))
          })
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
