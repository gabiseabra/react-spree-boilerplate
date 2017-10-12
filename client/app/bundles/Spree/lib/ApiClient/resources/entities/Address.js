import Resource from "../Resource"
import Country from "./Country"
import State from "./State"

export default class Address extends Resource {
  constructor(data) {
    super()
    this.id = data.id
    this.firstName = data.firstname
    this.lastName = data.lastname
    this.company = data.company
    this.city = data.city
    this.zipCode = data.zipcode
    this.phone = data.phone
    this.alternativePhone = data.alternative_phone
    this.country = new Country(data.country)
    this.state = new State(data.state)
    this.address = [
      data.address1,
      data.address2
    ]
  }
}
