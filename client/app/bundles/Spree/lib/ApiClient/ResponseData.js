import url from "url"
import { Pagination, Search } from "./models"

export default class ResponseData {
  constructor({ response, data }) {
    const { query } = url.parse(response.url)
    this.response = response
    this.data = data
    this.url = response.url
    this.query = query
  }

  get search() {
    return new Search(this.query)
  }
}

ResponseData.Json = class JsonResponseData extends ResponseData {
  constructor({ Entity, value, ...options }) {
    super(options)
    this.Entity = Entity
    this.value = value
  }

  get pagination() {
    return new Pagination(this.data)
  }

  get collection() {
    return this.Entity.collection
  }
}
