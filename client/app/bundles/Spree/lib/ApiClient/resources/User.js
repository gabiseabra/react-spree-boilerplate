import Resource from "./Resource"
import Address from "./Address"

export default class User extends Resource {
  static relationships = {
    addresses: {
      shipping: Address,
      billing: Address
    }
  }

  constructor(data) {
    super()
    this.id = data.id
    this.email = data.email
    this.login = data.login
    this.addresses = {
      shipping: new Address(data.ship_address),
      billing: new Address(data.bill_address)
    }
  }
}
