// import Response from "../Response"
// import { Order } from "../resources"

const href = ({ number }) => `/api/v1/orders/${number}`

export function post(props) {
  return this.route("/cart/populate", props)
}

export async function empty(order) {
  await this.fetch(`${href(order)}/empty`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "X-Spree-Order-Token": order.token
    }
  })
  return true
}