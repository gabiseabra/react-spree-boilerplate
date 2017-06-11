import _ from "lodash"
import fetch from "isomorphic-fetch"
import crossroads from "crossroads"
import Response from "./Response"
import {
  Pages,
  Products
} from "./endpoints"

export default class ApiClient {
  static TOKEN_HEADER = "X-Spree-Token"

  defaultHeaders = {
    Accept: "application/json"
  }

  constructor(url, token) {
    const { TOKEN_HEADER } = this.constructor
    this.router = crossroads.create()
    this.url = url
    this.pages = new Pages(this)
    this.products = new Products(this)
    if(token) {
      this.defaultHeaders[TOKEN_HEADER] = token
    }
  }

  route = (path) => this.router.parse(path)

  fetch = (url, options = {}) => {
    const headers = _.assign({}, options.headers || {}, this.defaultHeaders)
    return fetch(url, { ...options, headers })
      .then(response => Response.parse(response, options))
  }
}
