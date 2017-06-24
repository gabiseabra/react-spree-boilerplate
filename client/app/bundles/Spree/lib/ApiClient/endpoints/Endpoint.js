import _ from "lodash"

export default class Endpoint {
  constructor(apiClient) {
    this.api = apiClient
  }

  fetch = (path, options) => this.api.fetch(path, {
    parser: this.parseAny,
    ...options
  })

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)

  parseAny = data => (_.isArray(data) ? this.parseAll(data) : this.parse(data))
}
