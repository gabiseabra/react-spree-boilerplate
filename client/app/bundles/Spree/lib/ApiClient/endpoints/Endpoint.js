export default class Endpoint {
  constructor(apiClient) {
    this.api = apiClient
  }

  parse = data => new this.Entity(data)

  parseAll = data => data.map(this.parse)
}
