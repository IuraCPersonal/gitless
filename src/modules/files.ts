import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import { isNonNullish } from 'remeda'
import { isString } from '../lib/utils.js'

class Files {
  static #instance: Files

  private constructor() {}

  public static get instance(): Files {
    if (!Files.#instance) {
      Files.#instance = new Files()
    }

    return Files.#instance
  }

  inRepo(): boolean {
    return isNonNullish(this.gitlessPath())
  }

  assertInRepo(): void {
    if (!this.inRepo()) {
      throw new Error('not a Gitless repository')
    }
  }

  gitlessPath(relativePath?: string): string {
    const gitlessDir = this.gitlessDir(cwd())

    if (isNonNullish(gitlessDir)) {
      return path.join(gitlessDir, relativePath || '')
    }
  }

  // **writeFilesFromTree()** takes `tree` of files as a nested JS obj
  // and writes all those files to disk taking `prefix` as the root of
  // the tree.  `tree` format is: `{ a: { b: { c: "filecontent" }}}`
  writeFilesFromTree(tree: object, prefix: string): void {
    Object.keys(tree).forEach((name) => {
      const filePath = path.join(prefix, name)
      if (typeof tree[name] === 'string') {
        fs.writeFileSync(filePath, tree[name])
      }
      else {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, '777')
        }

        this.writeFilesFromTree(tree[name], filePath)
      }
    })
  }

  private read(path: string): string {
    if (fs.existsSync(path)) {
      return fs.readFileSync(path, 'utf-8')
    }
  }

  private gitlessDir(dir: string): string {
    if (fs.existsSync(dir)) {
      const potentialGitlessDir = path.join(cwd(), '.gitless')

      if (fs.existsSync(potentialGitlessDir)) {
        return potentialGitlessDir
      }
      else if (dir !== '/') {
        return this.gitlessDir(path.join(dir, '..'))
      }
    }
  }
}

export const files = Files.instance
