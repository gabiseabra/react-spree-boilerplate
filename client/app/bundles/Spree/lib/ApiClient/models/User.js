import Address from "./Address"

const getAddress = data => (data ? new Address(data) : null)

export default class User {
  static collection = "user"

  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.login = data.login
    this.addresses = {
      shipping: getAddress(data.ship_address),
      billing: getAddress(data.bill_address)
    }
  }

  static hydrate(data) {
    return new User(data)
  }
}
