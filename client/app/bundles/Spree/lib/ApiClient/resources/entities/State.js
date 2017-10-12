import Resource from "../Resource"

export default class State extends Resource {
  static collection = "states"

  constructor(data) {
    super()
    this.id = data.id
    this.name = data.name
    this.abbr = data.abbr
    this.countryId = data.country_id
  }
}
