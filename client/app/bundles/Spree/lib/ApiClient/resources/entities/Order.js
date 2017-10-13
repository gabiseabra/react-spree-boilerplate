import LineItem from "./LineItem"
import Address from "./Address"
import Resource from "../Resource"

const STEPS = [
  "cart",
  "address",
  "delivery",
  "confirm",
  "complete"
]

export default class Order extends Resource {
  static steps = STEPS

  static collection = "orders"

  constructor(data) {
    super()
    const shipping = data.ship_address
    const billing = data.bill_address
    this.id = data.id
    this.number = data.number
    this.token = data.token
    this.state = data.state
    this.userId = data.user_id
    this.quantity = data.quantity
    this.lineItems = data.line_items.map(item => new LineItem(item))
    this.price = {
      total: parseFloat(data.total),
      items: parseFloat(data.item_total),
      tax: parseFloat(data.tax_total),
      shipping: parseFloat(data.ship_total),
      adjustment: parseFloat(data.adjustment_total)
    }
    this.addresses = {
      shipping: (shipping ? new Address(shipping) : undefined),
      billing: (billing ? new Address(billing) : undefined)
    }
    this.steps = data.checkout_steps
  }

  static hydrate({ order }) {
    if(order) {
      return { order: new Order(order) }
    }
    return {}
  }
}
