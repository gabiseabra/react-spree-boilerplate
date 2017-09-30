import _ from "lodash"

const pagination = data => ({
  currentPage: data.current_page || 1,
  totalPages: data.total_pages,
  totalCount: data.total_count,
  perPage: data.per_page
})

pagination.query = ({ page, perPage }) => _.pickBy({
  page,
  per_page: perPage
}, val => val !== undefined)

pagination.hydrate = (data) => {
  if(data.pagination) {
    return { pagination: pagination(data.pagination) }
  }
  return {}
}

export default pagination
