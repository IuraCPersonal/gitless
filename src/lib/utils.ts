// `setIn({}, ["a", "b", "me"]); // => { a: { b: "me" } }`
export function setIn(object: unknown, arr: string[]): unknown {
  if (arr.length === 2) {
    object[arr[0]] = arr[1]
  }
  else if (arr.length > 2) {
    object[arr[0]] = object[arr[0]] || {}
    setIn(object[arr[0]], arr.slice(1))
  }

  return object
}

export function isString(thing: unknown): boolean {
  return typeof thing === 'string'
}
