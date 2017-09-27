import FormData from "isomorphic-form-data"
import Variant from "./Variant"
import Resource from "../Resource"
import Response from "../../Response"
import ResponseError from "../../ResponseError"
import { get } from "../../endpoints/methods"

const STEPS = [
  "cart",
  "address",
  "delivery",
  "confirm",
  "complete"
]

const lineItem = ({ id, quantity, price, total, variant_id, variant }) => ({
  id,
  quantity,
  price: parseFloat(price),
  total: parseFloat(total),
  variantId: variant_id,
  variant: new Variant(variant)
})

export default class Order extends Resource {
  static steps = STEPS

  static baseUrl = "/api/v1/orders"

  static collection = "orders"

  static endpoints = {
    get: get(Order),
    async post({ lineItems }) {
      const body = new FormData()
      if(lineItems) {
        Object.keys(lineItems).forEach((variantId) => {
          const { quantity } = lineItems[variantId]
          body.append("order[line_items][][quantity]", quantity)
          body.append("order[line_items][][variant_id]", variantId)
        })
      }
      try {
        const response = await this.json(Order.href(), {
          body,
          method: "POST",
          credentials: "same-origin"
        })
        return new Response(response, new Order(response.data))
      } catch(error) {
        if(error.status !== 422) throw error
        const data = await error.response.json()
        throw new ResponseError(error.response, data.error, data.errors)
      }
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
    this.lineItems = data.line_items.map(item => lineItem(item))
  }

  static hydrate({ orders, current_order }) {
    const result = {}
    if(orders) {
      result.orders = orders.map(data => new Order(data))
    }
    if(current_order) {
      result.current_order = new Order(current_order)
    }
    return result
  }
}
