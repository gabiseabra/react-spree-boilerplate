import _ from "lodash"
import qs from "querystring"
import url from "url"
import fetch from "isomorphic-fetch"
import Router from "universal-router" // eslint-disable-line import/extensions
import Response from "./Response"
import {
  Pages,
  Products,
  Taxonomies
} from "./endpoints"

export default class ApiClient {
  static TOKEN_HEADER = "X-Spree-Token"

  defaultHeaders = {
    Accept: "application/json"
  }

  constructor({ url: targetUrl, token }) {
    const { TOKEN_HEADER } = this.constructor
    this.endpoints = {
      pages: new Pages(this),
      products: new Products(this),
      taxonomies: new Taxonomies(this)
    }
    this.url = targetUrl
    this.router = new Router(this.routes())
    _.assign(this, this.endpoints)
    if(token) {
      this.defaultHeaders[TOKEN_HEADER] = token
    }
  }

  routes() {
    return _.keys(this.endpoints).reduce((arr, key) => {
      const endpoint = this.endpoints[key]
      if(endpoint.routes) {
        const routes = endpoint.routes()
        return arr.concat(routes)
      }
      return arr
    }, [])
  }

  route = (target, context = {}) => {
    const { pathname, query: queryString } = url.parse(target)
    const query = qs.parse(queryString)
    return this.router.resolve({ ...context, query, queryString, path: pathname })
  }

  fetch = (path, options = {}) => {
    const headers = _.assign({}, options.headers || {}, this.defaultHeaders)
    return fetch(path, { ...options, headers })
      .then(response => Response.parse(response, path, options))
      .catch(error => ({ error }))
  }
}
