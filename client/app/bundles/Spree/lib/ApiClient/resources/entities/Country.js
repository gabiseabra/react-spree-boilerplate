import Resource from "../Resource"

export default class Country extends Resource {
  static collection = "countries"

  constructor(data) {
    super()
    this.id = data.id
    this.name = data.name
    this.iso = data.iso
    this.requireStates = data.states_required
    this.requireZipCode = data.zipcode_required
  }
}
