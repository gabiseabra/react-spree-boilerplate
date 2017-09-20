import _ from "lodash"
import url from "url"
import fetch from "isomorphic-fetch"
import ResponseError from "./ResponseError"
import * as entities from "./resources"
import routes from "./routes"
import createEndpoints from "./endpoints"

const FORMATS = {
  json: "application/json",
  html: "text/html",
  text: "text/*;q=0.9 */*;q=0.8"
}

export const CSRF_TOKEN_HEADER = "X-CSRF-Token"

export default class ApiClient {
  constructor(apiUrl, { csrfToken }) {
    this.url = apiUrl
    this.csrfToken = csrfToken
    this.endpoints = createEndpoints(this, { entities, routes })
    Object.assign(this, this.endpoints)
  }

  get headers() {
    const headers = {}
    if(this.csrfToken) {
      headers[CSRF_TOKEN_HEADER] = this.csrfToken
    }
    return headers
  }

  request(input, init = {}) {
    const headers = new Headers(this.headers)
    const request = (input instanceof Request ? input : init)
    const path = (input instanceof Request ? input.path : input)
    if(request.headers) {
      const rawHeaders = (
        request.headers instanceof Headers ?
        request.headers.raw() :
        request.headers
      )
      _.keys(rawHeaders).forEach((header) => {
        headers.append(header, rawHeaders[header])
      })
    }
    if(request.credentials === "omit") {
      headers.delete(CSRF_TOKEN_HEADER)
    }
    if(init.format) {
      headers.append("Accept", FORMATS[init.format])
    }
    const targetUrl = url.resolve(this.url, path.replace(/^\//, ""))
    return new Request(targetUrl, {
      ...request,
      headers
    })
  }

  async fetch(...args) {
    const response = await fetch(this.request(...args))
    if(!response.ok) throw new ResponseError(response)
    return response
  }

  async json(req, init = {}) {
    const response = await this.fetch(req, { format: "json", ...init })
    return response.json()
  }

  async html(req, init = {}) {
    const response = await this.fetch(req, { format: "html", ...init })
    return response.text()
  }

  async text(req, init = {}) {
    const response = await this.fetch(req, { format: "text", ...init })
    return response.text()
  }

  async refreshCsrfToken() {
    const response = await this.json("/authenticity_token", {
      credentials: "same-origin"
    })
    this.csrfToken = response.authenticity_token
  }
}
