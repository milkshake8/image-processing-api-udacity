import supertest from 'supertest'
import app from '../index.js'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Test endpoint responses', (): void => {
  describe('gets the /api endpoint', (): void => {
    it('gets /api', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api')

      expect(response.status).toBe(200)
    })
  })

  describe('gets the /api/images endpoint', (): void => {
    it('gets /api/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images')

      expect(response.status).toBe(200)
    })

    it('gets /api/images?filename=fjord', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord'
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?filename=fjord&width=500&height=400', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord'
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?filename=fjord&width=100&height=abc (invalid width or height)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=100&height=abc'
      )

      expect(response.status).toBe(200)
    })
  })

  describe('endoint: /anything', () => {
    it('expects to return a 404 response ststatus for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/anything')

      expect(response.status).toBe(404)
    })
  })
})
