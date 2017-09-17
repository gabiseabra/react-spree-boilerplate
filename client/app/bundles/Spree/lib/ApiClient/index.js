import _ from "lodash"
import url from "url"
import fetch from "isomorphic-fetch"
import isIterable from "is-iterable"
// import autobind from "class-autobind"
import ResponseError from "./ResponseError"
import Store from "./Store"
import Resource from "./resources/Resource"
import * as entities from "./resources"
import routes from "./routes"
import createEndpoints from "./endpoints"

const FORMATS = {
  json: "application/json",
  html: "text/html",
  text: "text/*;q=0.9 */*;q=0.8"
}

export const CSRF_TOKEN_HEADER = "X-CSRF-Token"

function parseRelationships(resource, relationships) {
  Object.keys(relationships).forEach((key) => {
    const data = resource[key]
    const Entity = relationships[key]
    if(!(Entity.prototype instanceof Resource)) {
      parseRelationships.call(this, data, relationships[key])
    } else {
      this.store(data)
    }
  })
}

function store(resource) {
  const Entity = resource.constructor
  this.cache.set(Entity, resource)
  parseRelationships.call(this, resource, Entity.relationships)
  resource.api = this
}

export default class ApiClient {
  constructor(apiUrl, { csrfToken }) {
    // autobind(this)
    this.url = apiUrl
    this.csrfToken = csrfToken
    this.cache = new Store(Object.values(entities))
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

  async get(Entity, id) {
    const instance = this.cache.get(Entity, id)
    if(instance) {
      return instance
    } else if(Entity.collection in this.endpoints) {
      return this.endpoints[Entity.collection].get(id)
    }
    return undefined
  }

  async getAll(Entity, ids) {
    return ids.map(id => this.get(Entity, id))
  }

  store(resource) {
    if(isIterable(resource)) {
      for(const instance of resource) {
        store.call(this, instance)
      }
    } else {
      store.call(this, resource)
    }
  }

  async refreshCsrfToken() {
    const response = await this.json("/authenticity_token", {
      credentials: "same-origin"
    })
    this.csrfToken = response.authenticity_token
  }
}
