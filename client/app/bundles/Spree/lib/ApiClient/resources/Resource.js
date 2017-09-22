export default class Resource {
  static baseUrl = null
  static collection = null

  static href(id) {
    if(!this.baseUrl) return undefined
    return (
      typeof id === "undefined" ?
      this.baseUrl :
      `${this.baseUrl}/${id}`
    )
  }

  constructor() {
    this.id = null
  }

  get href() {
    return this.constructor.href(this.id)
  }

  get collection() {
    return { [this.constructor.collection]: [ this ] }
  }
}
