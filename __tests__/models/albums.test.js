const Albums = require('../../src/models/albums')
require('@code-fellows/supergoose')

const albums = new Albums()

describe('Albums model', () => {
  test('create a new album entry & get return that album', () => {
    const testAlbum = { name: 'Lemonade' }
    return albums.create(testAlbum)
      .then(results => {
        expect(results.name).toBe('Lemonade')
        return results._id
      })
      .then(results => {
        return albums.read(results)
          .then(results => expect(results[0].name.toBe('Lemonade')))
      })
  })

  test('read back all entries', () => {
    return albums.read()
      .then(results => {
        expect(results.length).toBe(5)
      })
  })

  test('able to update an album', () => {
    const testAlbum = { name: 'Lemonade' }
    return albums.create(testAlbum)
      .then(results => { return results._id })
      .then(results => {
        return albums.update(results._id, { name: 'Revolution' })
          .then(results => expect(results.name).toBe('Revolution'))
      })
  })

  test('able to delete an album', () => {
    const deleteThisAlbum = { name: 'My Own Prison' }
    return albums.create(deleteThisAlbum)
      .then(results => { return results._id })
      .then(results => {
        return albums.delete(results._id)
          .then(results => {
            expect(results.name).toBe('My Own Prison')
          })
      })
  })
})
