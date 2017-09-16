export default class Resource {
  static baseUrl = null
  static relationships = {}

  static href(id) {
    return this.baseUrl ? `${this.baseUrl}/${id}` : undefined
  }

  constructor(data) {
    this._data = data
    this.id = null
  }

  get href() {
    return this.constructor.href(this.id)
  }
}
