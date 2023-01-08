import { checkFilename, checkParams } from '../reqHandler.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

describe('Test for request parameters', (): void => {
  describe('Test for the filename', () => {
    it('expects the filename to be correct', async (): Promise<void> => {
      const filename: string = 'fjord.jpg'
      const filepath: string = path.resolve(__dirname, `../../images/`)
      const is_filename_legit: boolean | void = await checkFilename(
        filename,
        filepath
      )
      expect(is_filename_legit).toBe(true)
    })
    it('expects the filename to be not correct', async (): Promise<void> => {
      const filename: string = 'unknow.jpg'
      const filepath: string = path.resolve(__dirname, `../../images/`)
      const is_filename_legit: boolean | void = await checkFilename(
        filename,
        filepath
      )
      expect(is_filename_legit).toBe(false)
    })
  })

  describe('Test for the width and the height', () => {
    it("expects to return 'print the original image'", () => {
      const param_check: boolean | string = checkParams(null, null)
      expect(param_check).toBe('print the original image')
    })

    it('expects to return false', () => {
      const param_check: boolean | string = checkParams(200, -400)
      expect(param_check).toBe(false)
    })
    it("expects to return 'thumb already created'", () => {
      const param_check: boolean | string = checkParams(500, 700, 'fjord')
      expect(param_check).toBe('thumb already created')
    })
    it('expects to return true', () => {
      const param_check: boolean | string = checkParams(200, 200)
      expect(param_check).toBe(true)
    })
  })
})
