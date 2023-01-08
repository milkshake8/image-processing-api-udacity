import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import resizer from '../../utilities/resizer.js'
import { reqHandler } from '../../reqHandler.js'
import { promises as fs } from 'fs'

const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

//create the images route
const images: express.Router = express.Router()

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename: string = `${req.query.filename as string}.jpg`
    const width: number = parseInt(req.query.width as string)
    const height: number = parseInt(req.query.height as string)
    const reqCheck: number | undefined = await reqHandler(
      filename,
      width,
      height
    )

    switch (reqCheck) {
      case 0:
        const old_img_path: string = path.resolve(__dirname, '../../../images')
        const filenames: string = (await fs.readdir(old_img_path)).join(' ')
        res.send(
          `Incorrect filename: ${filename}! here are available filename: ${filenames} `
        )
        break
      case 1:
        res.send('height and width parameters must be positive numbers')
        break
      case 2:
        const new_img_path: string = path.resolve(
          __dirname,
          `../../../images/${filename}`
        )
        res.sendFile(new_img_path)
        break
      case 3:
        const old_filepath: string = path.resolve(
          __dirname,
          `../../../new_images/${width}x${height}${filename}`
        )
        console.log('thumb already created')
        res.sendFile(old_filepath)
        break
      case 4:
        console.log(`processing image`)
        await resizer(width, height, filename)
        const filepath: string = path.resolve(
          __dirname,
          `../../../new_images/${width}x${height}${filename}`
        )
        res.sendFile(filepath)
    }
  }
)
export default images
