import _ from "lodash"
import * as products from "./products"
import * as orders from "./orders"
import * as lineItems from "./lineItems"

const endpoints = {
  products,
  orders,
  lineItems
}

export default function createEndpoints(api) {
  const result = {}
  Object.keys(endpoints).forEach((name) => {
    result[name] = _.mapValues(endpoints[name], fun => fun.bind(api))
  })
  return result
}
