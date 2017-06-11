import qs from "querystring"

export default class Endpoint {
  path = ""

  constructor(apiClient) {
    this.api = apiClient
  }

  fetch = (path, options) => this.api.fetch(`${this.path}${path}`, { parser: this.parse, ...options })

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
