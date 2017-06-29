import _ from "lodash"

export default class Endpoint {
  constructor(apiClient) {
    this.api = apiClient
  }

  fetch = (path, options) => this.api.fetch(path, {
    Entity: this.Entity,
    ...options
  })
}
