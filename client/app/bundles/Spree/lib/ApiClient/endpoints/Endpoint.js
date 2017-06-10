import qs from "querystring"

export default class Endpoint {
  constructor(apiClient) {
    this.api = apiClient
  }

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)

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
