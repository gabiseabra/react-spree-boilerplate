import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class ProductsPage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/products", action: this.index },
      { path: "/products/:id", action: this.show }
    ]
  }

  index = ({ queryString }) => this.fetch(`/products?${queryString}`, { collection: "products" })

  show = ({ params: { id } }) => this.fetch(`/products/${id}`)
}
