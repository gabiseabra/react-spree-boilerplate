import { Collection, Product } from "../resources"
import Response from "../Response"
import buildQuery from "../helpers/query"

export default {
  "/products": async function ({ search, page, perPage }) {
    const queryString = buildQuery({ search, page, perPage })
    const response = await this.json(`/products?${queryString}`)
    return new Response(response, new Collection(response.data, Product))
  },
  "/products/:id": async function (_, { id }) {
    const response = await this.json(`/products/${id}`)
    return new Response(response, new Product(response.data))
  }
}
