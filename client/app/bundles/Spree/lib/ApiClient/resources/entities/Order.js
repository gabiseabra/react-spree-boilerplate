import Resource from "../Resource"

export default class Order extends Resource {
  static baseUrl = "/api/v1/products"

  static collection = "orders"

  static endpoints = {

  }

  constructor(data) {
    super()
    this.id = data.id
    this.number = data.number
    this.state = data.state
    this.userId = data.user_id
    this.price = {
      total: parseFloat(data.total),
      shipping: parseFloat(data.ship_total),
      adjustment: parseFloat(data.adjustment_total)
    }
  }
}
