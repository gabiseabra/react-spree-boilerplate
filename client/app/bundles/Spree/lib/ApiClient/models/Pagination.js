export default class Pagination {
  constructor(data) {
    this.currentPage = data.current_page
    this.totalPages = data.total_pages
    this.totalCount = data.total_count
    this.perPage = data.per_page
  }
}
