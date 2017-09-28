import FormData from "isomorphic-form-data"
import { Order } from "../resources"
import Response from "../Response"

export default {
  "/cart": async function () {
    const response = await this.json("/cart_link", {
      credentials: "same-origin"
    })
    return new Response(response, new Order(response.data))
  },
  "/cart/populate": async function ({ variantId, quantity }) {
    const body = new FormData()
    body.append("variant_id", variantId)
    body.append("quantity", quantity)
    const response = await this.json("/orders/populate", {
      body,
      method: "POST",
      credentials: "same-origin"
    })
    return new Response(response, new Order(response.data))
  },
  "/cart/update": async function ({ variantId, quantity }) {
    const body = new FormData()
    body.append("variant_id", variantId)
    body.append("quantity", quantity)
    const response = await this.json("/cart", {
      body,
      method: "PATCH",
      credentials: "same-origin"
    })
    return new Response(response, new Order(response.data))
  }
}
