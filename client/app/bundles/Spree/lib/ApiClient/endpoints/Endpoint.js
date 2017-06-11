import qs from "querystring"

export default class Endpoint {
  constructor(apiClient, router) {
    this.api = apiClient
    if(router) {
      this.api.router.pipe(router)
    }
  }

  fetch = (url, options) => this.api.fetch(url, { parser: this.parse, ...options })

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)

  query = {
    paginate({ page, per_page }) {
      return qs.stringify({ page, per_page })
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
