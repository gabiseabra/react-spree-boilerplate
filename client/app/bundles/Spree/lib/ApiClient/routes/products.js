import { Product } from "../resources"
import Collection from "../resources/Collection"

export default {
  "/products": async () => {
    const data = await this.json("/products")
    return new Collection(data, Product)
  },
  "/products/:id": async (_, { id }) => {
    const data = await this.json(`/products/${id}`)
    return new Product(data)
  }
}
