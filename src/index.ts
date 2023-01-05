import express from 'express'
import routes from './routes/index'
import FileHandler from './file_handling'

const app: express.Application = express()
const port: number = 3000

// Add routes
app.use(routes)

// Start server
app.listen(port, async (): Promise<void> => {
  await FileHandler.createThumbPath()
  console.log(`serveur demarre sur http://localhost:${port}`)
})

export default app
