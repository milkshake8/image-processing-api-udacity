import { promises as fs } from 'fs'
import path from 'path'
import FileHandler from '../file_handling'

describe('Test of resizing images using sharp module', (): void => {
  it('expects to throw an error because of a negative width', async (): Promise<void> => {
    const error: null | string = await FileHandler.createThumb({
      filename: 'fjord',
      width: '-400',
      height: '100'
    })
    expect(error).not.toBeNull()
  })

  it('expects to throw an error because of no valid filename', async (): Promise<void> => {
    const error: null | string = await FileHandler.createThumb({
      filename: 'anything',
      width: '400',
      height: '200'
    })
    expect(error).not.toBeNull()
  })

  it('expects to create resized image', async (): Promise<void> => {
    await FileHandler.createThumb({
      filename: 'fjord',
      width: '300',
      height: '100'
    })

    const createdImgPath: string = path.resolve(
      FileHandler.newImagePath,
      `300x100fjord.jpeg`
    )
    let errorFile: null | string = ''

    try {
      await fs.access(createdImgPath)
      errorFile = null
    } catch {
      errorFile = 'Failed to create the file'
    }

    expect(errorFile).toBeNull()
  })
})

// Clear the cache after all tests
afterAll(async (): Promise<void> => {
  const createdImgPath: string = path.resolve(
    FileHandler.newImagePath,
    '300x100fjord.jpg'
  )

  try {
    await fs.access(createdImgPath)
    fs.unlink(createdImgPath)
  } catch {}
})
