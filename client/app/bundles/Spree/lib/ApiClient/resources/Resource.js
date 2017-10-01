export default class Resource {
  static collection = null

  constructor() {
    this.id = null
  }

  toJSON() {
    const result = {}
    Object.getOwnPropertyNames(this).forEach((prop) => {
      let value = this[prop]
      if(Array.isArray(value)) {
        value = value.map(v => (v.toJSON ? v.toJSON() : v))
      } else if(value && value.toJSON) {
        value = value.toJSON()
      }
      result[prop] = value
    })
    return result
  }

  get collection() {
    return { [this.constructor.collection]: [ this.toJSON() ] }
  }
}
