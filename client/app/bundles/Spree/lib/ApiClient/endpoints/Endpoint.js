export default class Endpoint {
  path = ""

  constructor(apiClient) {
    this.api = apiClient
  }

  fetch = (path, options) => this.api.fetch(`${this.path}${path}`, { parser: this.parse, ...options })

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)
}
