import { flow, assign, omitBy } from "lodash/fp"
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
  const query = flow(
    assign(paginationQuery(page, perPage)),
    assign(searchQuery(search)),
    omitBy(x => !x)
  )({})
  return qs.stringify(query)
}
