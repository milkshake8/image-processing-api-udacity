import { promises as fs } from 'fs'
import path from 'path'
import imageResizer from './resizer'

//interface for image's parameters
interface ImageParams {
  filename?: string
  width?: string
  height?: string
}

export default class FileHandler {
  static oldImagePath = path.resolve(__dirname, '../images/old_images')
  static newImagePath = path.resolve(__dirname, '../images/new_images')

  /**
   * Create a path for the file if not existed
   * @param newImageParams
   * @returns null or rhe created path
   */
  static async ImagePath(newImageParams: ImageParams): Promise<null | string> {
    if (!newImageParams.filename) {
      return null
    }
    //Create a path for the file
    const new_images_path: string =
      newImageParams.width && newImageParams.height
        ? path.resolve(
            FileHandler.newImagePath,
            `${newImageParams.width}x${newImageParams.height}${newImageParams.filename}.jpg`
          )
        : path.resolve(
            FileHandler.newImagePath,
            `${newImageParams.filename}.jpg`
          )

    // Check if the file is already created
    try {
      await fs.access(new_images_path)
      return new_images_path
    } catch {
      return null
    }
  }
  /**
   * get the name of the image file
   * @returns the name of the file without the extension
   */
  static async getImagefilenames(): Promise<string[]> {
    try {
      return (await fs.readdir(FileHandler.oldImagePath)).map(
        (filename: string): string => filename.split('.')[0]
      )
    } catch {
      return []
    }
  }

  /**
   * Check if the image is available
   * @param filename name of the image file
   * @returns true or false depend on if the image is available
   */
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false
    }

    return (await FileHandler.getImagefilenames()).includes(filename)
  }

  /**
   * Check if a thumb exists
   * @param newImageParams
   * @returns true or false either the thumb exists or not
   */
  static async isThumbExisted(newImageParams: ImageParams): Promise<boolean> {
    if (
      !newImageParams.filename ||
      !newImageParams.width ||
      !newImageParams.height
    ) {
      return false
    }

    // Create right thumb path
    const new_thumb_path: string = path.resolve(
      FileHandler.newImagePath,
      `${newImageParams.width}x${newImageParams.height}${newImageParams.filename}.jpg`
    )
    newImageParams

    try {
      await fs.access(new_thumb_path)
      return true
    } catch {
      return false
    }
  }
  /**
   * Create a path for the thumb
   */
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(FileHandler.newImagePath)
    } catch {
      fs.mkdir(FileHandler.newImagePath)
    }
  }

  static async createThumb(
    newImageParams: ImageParams
  ): Promise<null | string> {
    if (
      !newImageParams.filename ||
      !newImageParams.width ||
      !newImageParams.height
    ) {
      return null
    }

    const filePathFull: string = path.resolve(
      FileHandler.oldImagePath,
      `${newImageParams.filename}.jpg`
    )
    const filePathThumb: string = path.resolve(
      FileHandler.newImagePath,
      `${newImageParams.width}x${newImageParams.height}${newImageParams.filename}.jpg`
    )

    console.log(`Creating thumb ${filePathThumb}`)

    // Resize original image and store as thumb
    return await imageResizer(
      filePathFull,
      filePathThumb,
      parseInt(newImageParams.width),
      parseInt(newImageParams.height)
    )
  }
}
