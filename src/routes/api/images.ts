import express from 'express'
import FileHandler from '../../file_handling'

// interface for image's parameters
interface ImageParams {
  filename?: string
  width?: string
  height?: string
}

/**
 * check if the URL's parameters are legit
 * @param query
 * @returns indication text to help the user
 */
const cheker = async (query: ImageParams): Promise<null | string> => {
  //check for the filename
  if (!(await FileHandler.isImageAvailable(query.filename))) {
    const ImageFileNames: string = (await FileHandler.getImagefilenames()).join(
      ', '
    )
    return `Invalid filenames. here are available filenames: ${ImageFileNames}.`
  }

  if (!query.width && !query.height) {
    return null
  }

  //check for the width
  const width: number = parseInt(query.width || '')
  if (Number.isNaN(width) || width < 1) {
    return 'width must be a not null positive number '
  }
  //check for the height
  const height: number = parseInt(query.height || '')
  if (Number.isNaN(height) || height < 1) {
    return 'height must be a not null positive number'
  }

  return null
}

const images: express.Router = express.Router()

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const checkerMsg: null | string = await cheker(req.query)
    if (checkerMsg) {
      res.send(checkerMsg)
      return
    }

    let error: null | string = ''

    //Create the thumb if it not texisted
    if (!(await FileHandler.isThumbExisted(req.query))) {
      error = await FileHandler.createThumb(req.query)
    }
    //Processing Error Handling
    if (error) {
      res.send(error)
      return
    }
    //Get And display the image
    const path: null | string = await FileHandler.ImagePath(req.query)
    if (path) {
      res.sendFile(path)
    } else {
      res.send('Unexpected error')
    }
  }
)

export default images
