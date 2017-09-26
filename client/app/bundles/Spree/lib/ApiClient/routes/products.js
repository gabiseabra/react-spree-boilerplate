import qs from "querystring"
import { Collection, Product } from "../resources"
import Response from "../Response"
import * as helpers from "../helpers"

export default {
  "/products": async function ({ search, page, perPage }) {
    const queryString = qs.stringify(Object.assign(
      helpers.pagination.query({ page, perPage }),
      search ? helpers.search.query(search) : {}
    ))
    const response = await this.json(`/products?${queryString}`)
    return new Response(response, new Collection(response.data, Product))
  },
  "/products/:id": async function (_, { id }) {
    const response = await this.json(`/products/${id}`)
    return new Response(response, new Product(response.data))
  }
}
