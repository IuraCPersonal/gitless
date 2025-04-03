import { setIn } from '../lib/utils.js'

export class Config {
  static #instance: Config

  private constructor() {}

  public static get instance(): Config {
    if (!Config.#instance) {
      Config.#instance = new Config()
    }

    return Config.#instance
  }

  // **objToStr()** `configObj` is a JS object that holds the config
  // for the repository.  `objToStr()` stringifies the object and
  // returns the string.
  objToStr(configObj: object): string {
    return Object.keys(configObj).reduce((arr, section) => {
      return arr.concat(
        Object.keys(configObj[section]).map(subsection => ({
          section,
          subsection,
        })),
      )
    }, [])
    .map(entry => {
      const subsection = entry.subsection === "" ? "" : " \"" + entry.subsection +"\"";
      const settings = configObj[entry.section][entry.subsection];

      return "[" + entry.section + subsection + "]\n" +
      Object.keys(settings).map(k => " " + k + " = " + settings[k]).join("\n") +
      "\n"
    })
    .join("")
  }
}

export const config = Config.instance
