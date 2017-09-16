import { Product } from "../resources"
import Collection from "../resources/Collection"

export default {
  "/products": async function () {
    const data = await this.json("/products")
    return new Collection(data, Product)
  },
  "/products/:id": async function (_, { id }) {
    const data = await this.json(`/products/${id}`)
    return new Product(data)
  }
}
