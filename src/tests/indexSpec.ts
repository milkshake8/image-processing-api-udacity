import supertest from 'supertest'
import app from '../index'
import { promises as fs } from 'fs'
import path from 'path'
import FileHandler from '../file_handling'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Testing my endpoints', (): void => {
  describe('test the endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/')

      expect(response.status).toBe(200)
    })
  })

  describe('test the endpoint: /api/images', (): void => {
    it('gets /api/images?filename=fjord', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord'
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?filename=fjord&width=200&height=100 ', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=200&height=100'
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?filename=fjord&width=-500&height=400 (invalid width)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=-500&height=400'
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images')

      expect(response.status).toBe(200)
    })
  })

  describe('endpoint: /anything', (): void => {
    it('expects to return 404 error for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/anything')

      expect(response.status).toBe(404)
    })
  })
})

// Clear the cache after all tests
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    FileHandler.newImagePath,
    '200x100fjord.jpg'
  )

  try {
    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
  } catch {}
})
