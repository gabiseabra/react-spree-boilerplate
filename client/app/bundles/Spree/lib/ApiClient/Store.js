import isIterable from "is-iterable"
import Resource from "./resources/Resource"

export default class Store {
  constructor(entities) {
    this.data = new Map()
    Object.keys(entities).forEach((Entity) => {
      this.data.set(Entity, new Map())
    })
  }

  getAll(Entity) {
    return this.data.get(Entity)
  }

  get(Entity, id) {
    const instances = this.getAll(Entity)
    return (instances.has(id) ? instances.get(id) : undefined)
  }

  set(Entity, instance) {
    this.getAll(Entity).set(instance.id, instance)
    return this
  }

  store(resource) {
    if(isIterable(resource)) {
      for(const instance of resource) {
        this.set(resource.Entity, instance)
      }
    } else if(resource instanceof Resource) {
      this.set(resource.constructor, resource)
    }
  }
}
