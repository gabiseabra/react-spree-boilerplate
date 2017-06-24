import _ from "lodash"
import qs from "querystring"
import { Search } from "../../models"

export const searchQuery = (predicates) => {
  if(predicates instanceof Search) {
    return predicates.query
  } else if(predicates) {
    const query = {}
    predicates.keys().forEach((key) => {
      query[`q[${key}]`] = predicates[key]
    })
    return query
  }
  return {}
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
