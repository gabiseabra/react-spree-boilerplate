import qs from "qs"

const search = (query) => {
  const params = (typeof query === "string" ? qs.parse(query) : query)
  return params.q || {}
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
