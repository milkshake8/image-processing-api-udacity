import resizer from '../../utilities/resizer.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

describe('Test the resizer function', () => {
  it('expects to not throw an error', async () => {
    const filename: string = 'encenadaport.jpg'
    const err: void | null = await resizer(600, 500, filename)
    expect(err).not.toBeNull()
  })
  it('expects to throw an error', async () => {
    const filename: string = 'unknow.jpg'
    const err: void | null = await resizer(600, 500, filename)
    expect(err).toBeNull()
  })
})
//erase the created thumb for the test
afterAll(async (): Promise<void> => {
  const img_path: string = path.resolve(
    __dirname,
    '../../../new_images/600x500encenadaport.jpg'
  )

  try {
    await fs.unlink(img_path)
  } catch (error) {
    console.log(error)
  }
})
