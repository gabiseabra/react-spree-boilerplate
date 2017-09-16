import Resource from "./Resource"

const country = data => ({
  id: data.id,
  name: data.name,
  iso: data.iso
})

const state = data => ({
  id: data.id,
  name: data.name,
  abbr: data.abbr
})

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
    this.country = country(data.country)
    this.state = state(data.state)
    this.address = [
      data.address1,
      data.address2
    ]
  }
}
