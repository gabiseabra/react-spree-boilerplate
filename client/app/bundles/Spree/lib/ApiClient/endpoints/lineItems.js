import _ from "lodash"
import qs from "querystring"
import Response from "../Response"
import { LineItem } from "../resources"

const queryString = props => qs.stringify(_.pickBy({
  "line_item[variant_id]": props.variantId,
  "line_item[quantity]": props.quantity
}, x => x !== undefined))

const href = ({ number }, id) => {
  if(!id) return `/api/v1/orders/${number}/line_items`
  return `/api/v1/orders/${number}/line_items/${id}`
}

export async function post(order, { variantId, quantity }) {
  const path = href(order)
  const query = queryString({ variantId, quantity })
  const response = await this.json(`${path}?${query}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "X-Spree-Order-Token": order.token
    }
  })
  return new Response(response, new LineItem(response.data))
}

export async function put(order, id, { quantity }) {
  const path = href(order, id)
  const query = queryString({ quantity })
  const response = await this.json(`${path}?${query}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "X-Spree-Order-Token": order.token
    }
  })
  return new Response(response, new LineItem(response.data))
}

export async function del(order, id) {
  if(!order || !id) return false
  await this.fetch(href(order, id), {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "X-Spree-Order-Token": order.token
    }
  })
  return true
}
