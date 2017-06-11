import ExtendableError from "es6-error"

export class ResponseError extends ExtendableError {
  constructor({ status, statusText }) {
    super(`HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
  }
}

export class Pagination {
  constructor(data) {
    this.currentPage = data.current_page
    this.totalPages = data.total_pages
    this.totalCount = data.total_count
    this.perPage = data.per_page
  }

  pageQuery = (page) => ({
    page,
    per_page: this.perPage
  })
}

export default class Response {
  static async parse(response, options) {
    if(!response.ok) {
      throw new ResponseError(response)
    }
    const json = await response.json()
    return new Response(json, options)
  }

  constructor(json, { collection, parser }) {
    let data = (collection && json[collection]) ? json[collection] : json
    if(parser) data = parser(data)
    this.collection = collection
    this.data = data
    if(json.per_page) {
      this.pagination = new Pagination(json)
    }
  }
}
