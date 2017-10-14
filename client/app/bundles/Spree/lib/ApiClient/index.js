import _ from "lodash"
import url from "url"
import fetch from "isomorphic-fetch"
import autobind from "class-autobind"
import ResponseError from "./ResponseError"
import Response from "./Response"
import createRouter from "./routes"
import createEndpoints from "./endpoints"

const FORMATS = {
  json: {
    header: "application/json",
    ext: ".json"
  },
  html: {
    header: "text/html",
    ext: null
  },
  text: {
    header: "text/*;q=0.9 */*;q=0.8",
    ext: ".txt"
  }
}

export const CSRF_TOKEN_HEADER = "X-CSRF-Token"

export default class ApiClient {
  constructor(apiUrl, { csrfToken }) {
    autobind(this)
    this.url = apiUrl
    this.csrfToken = csrfToken
    this.router = createRouter(this)
    Object.assign(this, createEndpoints(this))
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
    let path = (input instanceof Request ? input.path : input)
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
      const format = FORMATS[init.format]
      headers.append("Accept", format.header)
      if(format.ext) {
        const { pathname, query } = url.parse(path)
        path = pathname
        if(pathname.match(/\/$/)) path += "index"
        path += format.ext
        if(query) path += `?${query}`
      }
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
      let data
      try {
        data = await error.response.json()
      } catch(__) { throw error }
      throw new ResponseError(error.response, data.error, data)
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

  async route(target, context = {}) {
    const { pathname, query } = url.parse(target, true)
    return this.router.resolve({
      ...context,
      query,
      pathname
    })
  }

  async refreshCsrfToken() {
    const response = await this.json("/authenticity_token", {
      credentials: "same-origin"
    })
    this.csrfToken = response.data.authenticity_token
  }
}
