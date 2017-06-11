import ExtendableError from "es6-error"

export class ResponseError extends ExtendableError {
  constructor({ status, statusText }) {
    super(`HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
  }
}

/*
export class Pagination {
  constructor(data) {
    this.location = data.location
    this.currentPage = data.current_page
    this.nextPage = data.next_page
    this.prevPage = data.prev_page
    this.totalPages = data.total_pages
    this.totalCount = data.total_count
    this.perPage = data.per_page
  }
}
*/

export default class Response {
  static async parse(response) {
    if(!response.ok) {
      throw new ResponseError(response)
    }
    const json = await response.json()
    return new Response(json)
  }

  constructor(data) {
    this.data = data
  }
}
