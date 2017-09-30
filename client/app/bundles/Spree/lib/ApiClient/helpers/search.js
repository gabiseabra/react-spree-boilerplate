import qs from "querystring"

const search = (query) => {
  const params = (typeof query === "string" ? qs.parse(query) : query)
  const result = {}
  Object.keys(params).forEach((key) => {
    const match = key.match(/^q\[([^\]]+)\]$/)
    if(match) {
      result[match[1]] = params[key]
    }
  })
  return result
}

search.query = (predicates) => {
  const result = {}
  Object.keys(predicates).forEach((key) => {
    result[`q[${key}]`] = predicates[key]
  })
  return result
}

search.hydrate = (data) => {
  if(data.search) {
    return { search: search(data.search) }
  }
  return {}
}

export default search
