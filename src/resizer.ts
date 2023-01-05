import sharp from 'sharp'

/**
 * Resize image using sharp module
 * @param filename path of the image to process
 * @param newfilename path of the processed image
 * @param width processed image width
 * @param height processed image height
 * @returns void or a string
 */
async function imageResizer(
  filename: string,
  newfilename: string,
  width: number,
  height: number
): Promise<null | string> {
  try {
    await sharp(filename)
      .resize(width, height)
      .toFormat('jpeg')
      .toFile(newfilename)
    return null
  } catch {
    return "Can't resize the image"
  }
}

export default imageResizer
