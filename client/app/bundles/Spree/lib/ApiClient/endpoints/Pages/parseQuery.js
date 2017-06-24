import _ from "lodash"
import qs from "querystring"

export const searchQuery = (predicates) => {
  const query = {}
  if(predicates) {
    predicates.keys().forEach((key) => {
      query[`q[${key}]`] = predicates[key]
    })
  }
  return query
}

export const paginationQuery = (page, perPage) => ({ page, per_page: perPage })

export default function parseQuery({ search, page, perPage }) {
  const query = _({})
    .assign(
      paginationQuery(page, perPage),
      searchQuery(search)
    )
    .omitBy(_.isEmpty)
    .value()
  return qs.stringify(query)
}
