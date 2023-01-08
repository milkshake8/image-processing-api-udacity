import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname: string = path.dirname(fileURLToPath(import.meta.url))
const old_img_path: string = path.resolve(__dirname, '../images')
const new_img_path: string = path.resolve(__dirname, '../new_images')

/**
 * check if a image exists
 * @param filename name of the image
 * @param img_path path to the image
 * @returns true or false neither the image exists or not
 */
async function checkFilename(
  filename: string,
  img_path: string
): Promise<boolean | void> {
  try {
    const filenames: string[] = await fs.readdir(img_path)
    for (let file of filenames) {
      if (file === `${filename}`) return true
    }
    return false
  } catch (error) {
    return
  }
}

const filenames: string[] = await fs.readdir(new_img_path)
/**
 * check if the new image parameters are legit
 * @param width width of the new image
 * @param height height of the new image
 * @returns true or false neither all the parameters are legit or no
 */
function checkParams(
  width: number | null,
  height: number | null,
  filename?: string
): boolean | string {
  if (!width && !height) return 'print the original image'
  if (
    !width ||
    !height ||
    isNaN(width) ||
    isNaN(height) ||
    height < 0 ||
    width < 0
  )
    return false
  if (width > 0 && height > 0) {
    for (let file of filenames) {
      if (file === `${width}x${height}${filename}.jpg`)
        return 'thumb already created'
    }
  }
  return true
}
/**
 * Choose the right process to execute for an image
 * @param filename name of the file containing the image
 * @param width width of the new image
 * @param height height of the new image
 * @returns a number wich determines the process to do
 */
async function reqHandler(
  filename: string,
  width: number,
  height: number
): Promise<undefined | number> {
  if (!(await checkFilename(filename, old_img_path))) return 0 //the filename is incorrect
  if (checkParams(width, height) === false) return 1 //width or height parameters are incorrect
  if (checkParams(width, height) === 'print the original image') return 2
  if (checkParams(width, height, filename) === 'thumb already created') return 3
  if (checkParams(width, height) === true) return 4 //the image must be created
}

export { checkFilename, checkParams, reqHandler }
