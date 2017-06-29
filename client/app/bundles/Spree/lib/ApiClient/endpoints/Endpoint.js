import autobind from "class-autobind"

export default class Endpoint {
  constructor(apiClient) {
    autobind(this)
    this.api = apiClient
    this.fetch = this.api.fetch
  }
}
