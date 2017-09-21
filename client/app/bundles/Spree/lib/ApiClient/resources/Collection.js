import { parse as pagination } from "../helpers/pagination"

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
