import _ from "lodash"
import qs from "querystring"
import Variant from "./Variant"
import Resource from "../Resource"
import Response from "../../Response"

const queryString = props => qs.stringify(_.pickBy({
  "line_item[variant_id]": props.variantId,
  "line_item[quantity]": props.quantity
}, x => x !== undefined))

export default class LineItem extends Resource {
  static baseUrl = "/api/v1/orders"

  static collection = "line_items"

  static endpoint = "lineItems"

  static methods = {
    async post(order, { variantId, quantity }) {
      const query = queryString({ variantId, quantity })
      const href = `${LineItem.href(order)}?${query}`
      const response = await this.json(href, {
        method: "POST",
        credentials: "same-origin"
      })
      return new Response(response, new LineItem(response.data))
    },
    async put(order, id, { quantity }) {
      const query = queryString({ quantity })
      const href = `${LineItem.href(order, id)}?${query}`
      const response = await this.json(href, {
        method: "PUT",
        credentials: "same-origin"
      })
      return new Response(response, new LineItem(response.data))
    },
    async delete(order, id) {
      if(!order || !id) return false
      await this.fetch(LineItem.href(order, id), {
        method: "DELETE",
        credentials: "same-origin"
      })
      return true
    }
  }


  static href(order, id) {
    if(!id) return `/api/v1/orders/${order}/line_items`
    return `/api/v1/orders/${order}/line_items/${id}`
  }

  constructor(data) {
    super()
    this.id = data.id
    this.quantity = data.quantity
    this.price = parseFloat(data.price)
    this.total = parseFloat(data.total)
    this.variantId = data.variant_id
    this.variant = new Variant(data.variant)
  }
}
