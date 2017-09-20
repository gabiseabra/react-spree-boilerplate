export default ({ page, perPage, totalPages, totalCount } = {}) => ({
  per_page: perPage || 20,
  current_page: page || 1,
  total_pages: totalPages || 1,
  total_count: totalCount || 0
})
