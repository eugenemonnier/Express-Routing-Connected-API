// dependencies
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { handleGet, handleGetOneArtist, handlePost, handleEdit, handleDestroy, getModel } = require('./lib/routeGenerators')

// middleware
const app = express()
app.use(morgan())
app.use(express.json())
app.use(cors())

// routes
app.param('model', getModel)
app.get('/api/v1/:model', handleGet)
app.get('/api/v1/:model/:id', handleGet)
app.get('/api/v1/:model/:id/albums', handleGetOneArtist)
app.post('/api/v1/:model', handlePost)
app.put('/api/v1/:model/:id', handleEdit)
app.delete('/api/v1/:model/:id', handleDestroy)

app.get('/bad_route', (req, res) => {
  throw new Error('Now you done it')
})

// catch alls
const notFoundHandler = require('./middleware/404')
app.use(notFoundHandler)
const internalServerErrorHandler = require('./middleware/internalServerErrorHandler')
app.use(internalServerErrorHandler)

// assume server isn't running
let isRunning = false

module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true
        console.log(`Server listening on port ${port}...`)
      })
    } else {
      console.error('Server is already running!')
    }
  }
}
