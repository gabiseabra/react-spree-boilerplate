export class Pagination {
  constructor(data) {
    this.currentPage = data.current_page
    this.nextPage = data.next_page
    this.prevPage = data.prev_page
    this.totalPages = data.total_pages
    this.totalCount = data.total_count
    this.perPage = data.per_page
  }
}

export default class Page extends Array {
  constructor({ collection, pagination }) {
    super(...collection)
    this.pagination = new Pagination(pagination)
  }
}
