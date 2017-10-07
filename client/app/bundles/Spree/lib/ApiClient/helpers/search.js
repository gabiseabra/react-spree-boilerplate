import qs from "qs"

const search = (query, q = "search") => {
  const params = (typeof query === "string" ? qs.parse(query) : query)
  return params[q] || {}
}

search.query = (predicates, q = "search") => {
  const result = {}
  Object.keys(predicates).forEach((key) => {
    result[`${q}[${key}]`] = predicates[key]
  })
  return result
}

export default search
