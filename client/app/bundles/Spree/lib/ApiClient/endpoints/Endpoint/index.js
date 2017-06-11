import qs from "querystring"
import Page from "./Page"

export default class Endpoint {
  constructor(apiClient, router) {
    this.api = apiClient
    if(router) {
      this.api.router.pipe(router)
    }
  }

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)

  parsePage = (options) => new Page(options)

  query = {
    paginate({ page, count }) {
      return qs.stringify({ page, per_page: count })
    },
    search(predicates) {
      const query = {}
      predicates.keys().forEach(key => {
        query[`q[${key}]`] = predicates[key]
      })
      return query
    }
  }
}
