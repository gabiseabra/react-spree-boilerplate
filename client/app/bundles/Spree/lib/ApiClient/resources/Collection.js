import { pagination } from "../helpers"

export default class Collection {
  constructor(data, Entity) {
    this.Entity = Entity
    this.data = data[Entity.collection].map(item => new Entity(item))
    this.pagination = pagination.parse(data)
  }

  * [Symbol.iterator]() {
    yield* this.data
  }

  get collection() {
    return { [this.Entity.collection]: this.data }
  }
}
