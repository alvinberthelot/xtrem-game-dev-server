export function split<T>(params: {
  values: T[]
  predicate: Function
}): [T[], T[]] {
  return params.values.reduce(
    (acc, v) => {
      const odd = params.predicate(v)
        ? [...acc[0], v]
        : [...acc[0]]
      const even = !params.predicate(v)
        ? [...acc[1], v]
        : [...acc[1]]
      return [odd, even]
    },
    [[], []]
  )
}
