import Collection from "../resources/Collection"
import { pagination } from "../helpers"

export default class Map {
  constructor(data, entities) {
    this.entities = entities
    this.pagination = pagination.parse(data)
    this.collection = {}
    Object.keys(entities).forEach((key) => {
      const Entity = entities[key]
      const collection = Entity.collection
      const item = data[key]
      if(Array.isArray(item)) {
        const instance = new Collection({ [collection]: item }, Entity)
        this[key] = instance
        this.collection[collection] = instance
      } else {
        const instance = new Entity(item)
        this[key] = instance
        this.collection[collection] = [ instance ]
      }
    })
  }
}
