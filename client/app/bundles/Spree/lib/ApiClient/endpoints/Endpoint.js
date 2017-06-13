import _ from "lodash"
import qs from "querystring"

export const searchQuery = (predicates) => {
  const query = {}
  if(predicates) {
    predicates.keys().forEach(key => {
      query[`q[${key}]`] = predicates[key]
    })
  }
  return query
}

export const paginationQuery = (page, perPage) => ({ page, per_page: perPage })

export default class Endpoint {
  constructor(apiClient) {
    this.api = apiClient
  }

  query({ search, page, perPage }) {
    const query = _({})
      .assign(
        paginationQuery(page, perPage),
        searchQuery(search)
      )
      .omitBy(_.isEmpty)
      .value()
    return qs.stringify(query)
  }

  fetch = (path, options) => this.api.fetch(path, {
    parser: this.parseAny,
    ...options
  })

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)

  parseAny = data => (_.isArray(data) ? this.parseAll(data) : this.parse(data))
}
