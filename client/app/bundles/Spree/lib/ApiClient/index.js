import fetch from "isomorphic-fetch"
import crossroads from "crossroads"
import ResponseError from "./ResponseError"
import {
  Pages,
  Products
} from "./endpoints"

export default class ApiClient {
  static TOKEN_HEADER = "X-Spree-Token"

  constructor(url, token) {
    this.router = crossroads.create()
    this.url = url
    this.token = token
    this.pages = new Pages(this)
    this.products = new Products(this)
  }

  route = (path) => this.router.parse(path)

  fetch = (url, options = {}) => {
    const { TOKEN_HEADER } = this.constructor
    const headers = options.headers || {}
    const token = this.token || options.token
    if(token && !(TOKEN_HEADER in headers)) {
      headers[TOKEN_HEADER] = token
    }
    return fetch(url, { ...options, headers })
      .then(response => {
        if(response.status >= 300 || response.status < 200) {
          throw new ResponseError(response)
        }
        return response.json()
      })
  }
}
