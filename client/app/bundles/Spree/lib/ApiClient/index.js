import _ from "lodash"
import qs from "querystring"
import url from "url"
import fetch from "isomorphic-fetch"
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
    this.endpoints = {
      pages: new Pages(this),
      products: new Products(this),
      taxonomies: new Taxonomies(this)
    }
    this.url = `${scheme}://${host}:${port}/`
    this.router = new Router(this.routes())
    _.assign(this, this.endpoints)
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

  route = (target, context = {}) => {
    const { pathname, query: queryString } = url.parse(target)
    const query = qs.parse(queryString)
    return this.router.resolve({ ...context, query, queryString, path: pathname })
  }

  fetch = (path, options = {}) => {
    const reqOptions = _.merge({}, options, this.defaultOptions)
    const format = reqOptions.format
    if(format && !reqOptions.headers.Accept) {
      reqOptions.headers.Accept = FORMATS[format]
    }
    return fetch(path, reqOptions)
      .then((response) => {
        if(!response.ok) throw new ResponseError(response)
        return new Response(response, reqOptions)
      })
      .then(response => (format ? response[format].call(response) : response))
      .catch(error => ({ error }))
  }
}
