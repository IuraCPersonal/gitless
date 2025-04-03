import * as fs from 'fs';
import * as zlib from 'zlib'
import { Args, Command, Flags } from '@oclif/core'

export default class CatFile extends Command {
  static override args = {
    object_hash: Args.string({
      required: true,
      description: 'The name of the object to show.',
    }),
  }

  static override flags = {
    pretty_print: Flags.boolean({
      char: 'p',
      description: 'Pretty-print the contents of <object> based on its type.'
    }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CatFile)

    const blobDir = args.object_hash.substring(0, 2)
    const blobFile = args.object_hash.substring(2)

    // TODO: replace .git with .gitless when commit function will be added
    const blob = fs.readFileSync(`.git/objects/${blobDir}/${blobFile}`)
    const decompressedBuffer = zlib.unzipSync(blob)

    const nullByteIndex = decompressedBuffer.indexOf(0);
    const blobContent = decompressedBuffer.subarray(nullByteIndex + 1).toString();

    process.stdout.write(blobContent);
  }
}
