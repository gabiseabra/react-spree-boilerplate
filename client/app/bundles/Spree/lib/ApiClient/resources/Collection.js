const pagination = data => ({
  currentPage: data.current_page || 1,
  totalPages: data.total_pages,
  totalCount: data.total_count,
  perPage: data.per_page
})

export default class Collection {
  constructor(data, Entity, collection) {
    const key = (collection || Entity.collection)
    this.Entity = Entity
    this.pagination = pagination(data)
    this.data = data[key].map(item => new Entity(item))
  }

  [Symbol.iterator]() {
    return this.data.values()
  }
}
