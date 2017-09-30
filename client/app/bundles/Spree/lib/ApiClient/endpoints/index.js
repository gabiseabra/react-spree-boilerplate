import _ from "lodash"
import * as hydrate from "./hydrate"
import * as products from "./products"
import * as orders from "./orders"
import * as lineItems from "./lineItems"

const endpoints = {
  hydrate,
  products,
  orders,
  lineItems
}

export default function createEndpoints(api) {
  const result = {}
  Object.keys(endpoints).forEach((name) => {
    const { ...methods } = endpoints[name]
    const main = methods.default
    delete methods.default
    result[name] = _.mapValues(methods, fun => fun.bind(api))
    if(main) {
      result[name] = Object.assign(main.bind(api), result[name])
    }
  })
  return result
}
