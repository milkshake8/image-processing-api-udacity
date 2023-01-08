import express from 'express'
import routes from './routes/index.js'

const app: express.Application = express()
const port: number = 3000 //default port

//add the main route
app.use('/api', routes)

//start the server
app.listen(port, () => {
  console.log(`serveur demarre sur l'adresse http://localhost:${port}`)
})
export default app
