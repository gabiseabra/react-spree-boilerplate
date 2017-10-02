import url from "url"
import { Resource, Collection, Map } from "./resources"
import { search } from "./helpers"

export default class ApiResponse {
  constructor(response, data) {
    this.url = response.url
    this.status = response.status
    this.statusText = response.statusText
    this.data = data
  }

  get isResource() {
    return (
      this.data instanceof Resource ||
      this.data instanceof Collection ||
      this.data instanceof Map
    )
  }

  get query() {
    return url.parse(this.url, true).query
  }

  get search() {
    return search.parse(this.query)
  }

  get pagination() {
    if(this.isResource) {
      return this.data.pagination
    }
    return undefined
  }

  get collection() {
    if(this.isResource) {
      return this.data.collection
    }
    return undefined
  }

  toJSON() {
    return (this.data.toJSON ? this.data.toJSON() : this.data)
  }
}
