import _ from "lodash"
import qs from "querystring"
import url from "url"
import fetch from "isomorphic-fetch"
import autobind from "class-autobind"
import Router from "universal-router" // eslint-disable-line import/extensions
import Response from "./Response"
import ResponseError from "./ResponseError"
import hydrate from "./models/hydrate"
import {
  Pages,
  Products,
  Taxonomies
} from "./endpoints"

const FORMATS = {
  json: "application/json",
  html: "text/html",
  text: "text/*;q=0.9 */*;q=0.8"
}

export default class ApiClient {
  static API_TOKEN_HEADER = "X-Spree-Token"
  static CRF_TOKEN_HEADER = "X-CRF-Token"

  defaultOptions = {
    format: "json",
    headers: {}
  }

  constructor({ scheme, host, port }) {
    autobind(this)
    this.endpoints = {
      pages: new Pages(this),
      products: new Products(this),
      taxonomies: new Taxonomies(this)
    }
    this.url = `${scheme}://${host}:${port}/`
    this.router = new Router(this.routes())
    _.assign(this, this.endpoints)
    window.$$apiClient = this
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

  hydrate = hydrate

  route(target, context = {}) {
    const { pathname, query: queryString } = url.parse(target)
    const query = qs.parse(queryString)
    return this.router.resolve({
      ...context,
      path: pathname,
      queryString,
      query
    })
  }

  parseRequestOptions(opts) {
    const options = _.merge({}, this.defaultOptions, opts)
    if(options.format && !options.headers.Accept) {
      options.headers.Accept = FORMATS[options.format]
    }
    return options
  }

  async fetch(path, opts = {}) {
    const options = this.parseRequestOptions(opts)
    const response = await fetch(path, options)
    if(!response.ok) throw new ResponseError(response)
    const apiResponse = new Response(response, options)
    if(options.format) {
      return apiResponse[options.format].call(apiResponse)
    }
    return apiResponse
  }
}
