import { cwd } from 'node:process'
import { isNonNullish } from 'remeda'

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

  gitlessPath(): string | undefined {
    const foo = cwd()

    // eslint-disable-next-line no-console
    console.log(foo)

    return undefined
  }
}

export const files = Files.instance
