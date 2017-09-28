import FormData from "isomorphic-form-data"
import LineItem from "./LineItem"
import Resource from "../Resource"
import Response from "../../Response"

const STEPS = [
  "cart",
  "address",
  "delivery",
  "confirm",
  "complete"
]

export default class Order extends Resource {
  static steps = STEPS

  static baseUrl = "/api/v1/orders"

  static collection = "orders"

  static methods = {
    async post(props) {
      /*
      const body = new FormData()
      if(lineItems) {
        Object.keys(lineItems).forEach((variantId) => {
          const { quantity } = lineItems[variantId]
          body.append("order[line_items][][quantity]", quantity)
          body.append("order[line_items][][variant_id]", variantId)
        })
      }
      const response = await this.json(Order.href(), {
        body,
        method: "POST",
        credentials: "same-origin"
      })
      return new Response(response, new Order(response.data))
      */
      return this.route("/cart/populate", props)
    },
    async empty(number) {
      await this.fetch(`${Order.href(number)}/empty`, {
        method: "PUT",
        credentials: "same-origin"
      })
      return true
    }
  }

  constructor(data) {
    super()
    this.id = data.id
    this.number = data.number
    this.token = data.token
    this.state = data.state
    this.userId = data.user_id
    this.quantity = data.total_quantity
    this.price = {
      total: parseFloat(data.total),
      items: parseFloat(data.item_total),
      tax: parseFloat(data.tax_total),
      shipping: parseFloat(data.ship_total),
      adjustment: parseFloat(data.adjustment_total)
    }
    this.lineItems = data.line_items.map(item => new LineItem(item))
  }

  static hydrate({ order }) {
    if(order) {
      return { order: new Order(order) }
    }
    return {}
  }
}
