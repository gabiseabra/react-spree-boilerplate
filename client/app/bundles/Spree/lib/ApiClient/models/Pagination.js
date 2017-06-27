export default class Pagination {
  static collection = "pagination"

  constructor(data) {
    this.currentPage = data.current_page
    this.totalPages = data.total_pages
    this.totalCount = data.total_count
    this.perPage = data.per_page
  }

  static hydrate(data) {
    return new Pagination(data)
  }
}
