import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * resize an image
 * @param width width of the thumb image
 * @param height height of the thumb image
 * @param filename name of the file containing the image
 */
async function resizer(
  width: number,
  height: number,
  filename: string
): Promise<void | null> {
  try {
    const old_img_path: string = path.resolve(
      __dirname,
      `../../images/${filename}`
    )
    const new_img_path: string = path.resolve(
      __dirname,
      `../../new_images/${width}x${height}${filename}`
    )
    await sharp(old_img_path).resize(width, height).toFile(new_img_path)
  } catch (error) {
    return null
  }
}
export default resizer
