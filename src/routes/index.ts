import express from 'express'
import images from './api/images.js'

const routes: express.Router = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Welcome to image processing api')
})
routes.use('/images', images)

export default routes
