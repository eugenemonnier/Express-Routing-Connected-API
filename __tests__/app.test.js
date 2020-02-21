const supergoose = require('@code-fellows/supergoose')
const { server } = require('../src/app')
const mockRequest = supergoose(server)

describe('API server', () => {
  test('404 error on invalid route', () => {
    return mockRequest
      .get('/nowheresville')
      .then(results => {
        expect(results.status).toBe(404)
      })
  })

  test('500 error when an internal server error occurs', () => {
    return mockRequest
      .get('/bad_route')
      .then(results => {
        expect(results.status).toBe(500)
      })
  })
})
