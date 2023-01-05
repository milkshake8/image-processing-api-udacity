import express from 'express'
import images from './api/images'

const routes: express.Router = express.Router()

routes.use('/api/images', images)

routes.get('/', (req: express.Request, res: express.Response): void => {
  // This could be done by serving views ... Just quick and dirty for now :-)
  res.send('Hello, Welcome to Image processing API')
})

export default routes
