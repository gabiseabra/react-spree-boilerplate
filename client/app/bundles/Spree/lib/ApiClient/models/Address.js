export default class Address {
  constructor(data) {
    const { parseCountry, parseState } = this.constructor
    this.id = data.id
    this.firstName = data.firstname
    this.lastName = data.lastname
    this.company = data.company
    this.city = data.city
    this.zipCode = data.zipcode
    this.phone = data.phone
    this.alternativePhone = data.alternative_phone
    this.country = parseCountry(data.country)
    this.state = parseState(data.state)
    this.address = [
      data.address1,
      data.address2
    ]
  }

  static parseCountry({ id, name, iso_name, iso }) {
    return { id, name, iso, isoName: iso_name }
  }

  static parseState({ id, name, abbr }) {
    return { id, name, abbr }
  }
}
