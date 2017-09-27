import _ from "lodash"
import url from "url"
import fetch from "isomorphic-fetch"
import ResponseError from "./ResponseError"
import Response from "./Response"
import * as entities from "./resources/entities"
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
    try {
      const response = await this.fetch(req, { format: "json", ...init })
      return new Response(response, await response.json())
    } catch(error) {
      if(error.status !== 422) throw error
      try {
        const data = await error.response.json()
        throw new ResponseError(error.response, data.error, data)
      } catch(__) { throw error }
    }
  }

  async html(req, init = {}) {
    const response = await this.fetch(req, { format: "html", ...init })
    return new Response(response, await response.text())
  }

  async text(req, init = {}) {
    const response = await this.fetch(req, { format: "text", ...init })
    return new Response(response, await response.text())
  }

  async refreshCsrfToken() {
    const response = await this.json("/authenticity_token", {
      credentials: "same-origin"
    })
    this.csrfToken = response.data.authenticity_token
  }
}
