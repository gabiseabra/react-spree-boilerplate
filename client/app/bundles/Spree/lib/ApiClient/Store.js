export default class Store {
  constructor(entities) {
    this.data = new Map()
    entities.forEach((Entity) => {
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
}
