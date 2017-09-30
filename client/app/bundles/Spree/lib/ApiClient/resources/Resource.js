export default class Resource {
  static collection = null

  constructor() {
    this.id = null
  }

  get collection() {
    return { [this.constructor.collection]: [ this ] }
  }
}
