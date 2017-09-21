import qs from "querystring"

export const parse = (query) => {
  const search = (typeof query === "string" ? qs.parse(query) : query)
  const result = {}
  Object.keys(search).forEach((key) => {
    const match = key.match(/^q\[([^\]]+)\]$/)
    if(match) {
      result[match[1]] = search[key]
    }
  })
  return result
}

export const query = (predicates) => {
  const result = {}
  Object.keys(predicates).forEach((key) => {
    result[`q[${key}]`] = predicates[key]
  })
  return result
}
