import * as fs from 'fs'
import zlib from 'zlib'
import crypto from 'crypto'
import { Args, Command, Flags } from '@oclif/core'

export default class HashObject extends Command {
  static override args = {
    file: Args.string({ description: 'file to read' }),
  }
  static override flags = {
    write: Flags.boolean({ char: 'w' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(HashObject)

    const data = fs.readFileSync(args.file)
    const meta = Buffer.from(`blob ${data.length}\0`)
    const contents = Buffer.concat([meta, data])

    // Buffers are in binary format by default (<Buffer 34 52 6c 5f 00 00>) You can read them:
    // console.log(data.toString('utf8'))

    const hash = crypto.createHash("sha1").update(contents).digest("hex")
    console.log(hash)

    // If we have a '-w' flag, write it to the objects directory
    if (flags.write) {
      const compressedData = zlib.deflateSync(contents)
      const objectPath = `.gitless/objects/${hash.slice(0, 2)}/${hash.slice(2)}`
      fs.mkdirSync(`.gitless/objects/${hash.slice(0, 2)}`, { recursive: true })
      fs.writeFileSync(objectPath, compressedData)
    }
  }
}
