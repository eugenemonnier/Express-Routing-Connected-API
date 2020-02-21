const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.json())

const categoriesRouter = require('./api/categoriesRouter')
app.use(categoriesRouter)
const productsRouter = require('./api/productsRouter')
app.use(productsRouter)

app.get('/bad_route', (req, res) => {
  throw new Error('Now you done it')
})

const notFoundHandler = require('./middleware/404')
app.use(notFoundHandler)
const internalServerErrorHandler = require('./middleware/internalServerErrorHandler')
app.use(internalServerErrorHandler)

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
