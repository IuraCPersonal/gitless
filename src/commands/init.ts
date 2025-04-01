import { Command } from '@oclif/core'

import { files } from '../modules/files.js'

export default class Init extends Command {
  public async run(): Promise<void> {
    // Abort if already a repository.
    if (files.inRepo()) {
      this.error('Already a repository.')
    }

    // Create the .gitignore file.
  }
}
