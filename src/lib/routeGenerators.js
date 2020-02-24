
const Artists = require('../models/artists')
const Genres = require('../models/genres')
const Albums = require('../models/albums')
const artists = new Artists()
const genres = new Genres()
const albums = new Albums()

function getModel (req, res, next) {
  const model = req.params.model
  switch (model) {
    case 'artists':
      req.model = artists
      next()
      return
    case 'genres':
      req.model = genres
      next()
      return
    case 'albums':
      req.model = albums
      next()
      return
    default:
      throw new Error('Invalid Model')
  }
}

function handleGet (req, res, next) {
  const input = req.params.id ? req.params.id : ''
  req.model.read(input)
    .then(results => {
      const output = {
        count: results.length,
        data: results
      }
      res.status(200).json(output)
    })
    .catch(next)
}

function handleGetOneArtist (req, res, next) {
  req.model.read(req.params.id)
    .populate('albums')
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function handlePost (req, res, next) {
  if (!req.body) throw new Error('Missing body.')
  req.model.create(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
}

function handleEdit (req, res, next) {
  if (!req.params.id || !req.body) throw new Error('Missing required input(s).')
  req.model.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function handleDestroy (req, res, next) {
  if (!req.params.id) throw new Error('Missing ID.')
  req.model.delete(req.params.id)
    .then(result => {
      res.status(202).json(result)
    })
    .catch(next)
}

module.exports = {
  handleGet,
  handleGetOneArtist,
  handlePost,
  handleEdit,
  handleDestroy,
  getModel
}
