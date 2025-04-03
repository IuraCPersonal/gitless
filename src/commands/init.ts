import { cwd } from 'node:process'

import { Command, Flags } from '@oclif/core'
import { config } from '../modules/config.js'
import { files } from '../modules/files.js'

export default class Init extends Command {
  static override flags = {
    bare: Flags.boolean({ default: false }),
  }

  public async run(): Promise<void> {
    // Abort if already a repository.
    if (files.inRepo()) {
      this.error('Already a repository.')
    }

    const { flags } = await this.parse(Init)

    const gitlessStructure = {
      HEAD: 'ref: refs/heads/master\n',

      // If `--bare` was passed, write to the Git config indicating
      // that the repository is bare.  If `--bare` was not passed,
      // write to the Git config saying the repository is not bare.
      config: config.objToStr({ core: { '': { bare: flags.bare === true } } }),

      objects: {},
      refs: {
        heads: {},
      },
    }

    // Write the standard Git directory structure using the
    // `gitlessStructure` JS object.  If the repository is not bare,
    // put the directories inside the `.gitless` directory.  If the
    // repository is bare, put them in the top level of the
    // repository.
    files.writeFilesFromTree(flags.bare ? gitlessStructure : { '.gitless': gitlessStructure }, cwd())
  }
}
