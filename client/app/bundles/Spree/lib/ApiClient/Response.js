import url from "url"
import qs from "querystring"
import ExtendableError from "es6-error"

export class ResponseError extends ExtendableError {
  constructor({ status, statusText }) {
    super(`HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
  }
}

export default class Response {
  static async parse(response, targetUrl, options) {
    if(!response.ok) {
      throw new ResponseError(response)
    }
    const json = await response.json()
    return new Response(json, targetUrl, options)
  }

  constructor(json, targetUrl, { collection, parser }) {
    let data = (collection && json[collection]) ? json[collection] : json
    if(parser) data = parser(data)
    this.collection = collection
    this.data = data
    this.url = url.parse(targetUrl)
    this.query = qs.parse(this.url.query)
    if(json.per_page) {
      this.pagination = {
        currentPage: json.current_page,
        totalPages: json.total_pages,
        totalCount: json.total_count,
        perPage: json.per_page
      }
    }
  }

  get search() {
    const searchParams = {}
    _.keys(this.query).forEach(key => {
      if(/^q\[[^\]]+\]$/.test(key)) {
        searchParams[key] = this.query[key]
      }
    })
    return searchParams
  }
}
