import Resource from "../Resource"

export default class State extends Resource {
  constructor(data) {
    super()
    this.id = data.id
    this.name = data.name
    this.abbr = data.abbr
  }
}
