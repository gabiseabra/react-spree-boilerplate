import _ from "lodash"

export const parse = data => ({
  currentPage: data.current_page || 1,
  totalPages: data.total_pages,
  totalCount: data.total_count,
  perPage: data.per_page
})

export const query = ({ page, perPage }) => _.pickBy({
  page,
  per_page: perPage
}, val => val !== undefined)
