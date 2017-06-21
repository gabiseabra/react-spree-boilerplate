import Endpoint from "../Endpoint"
import { Product } from "../../models"

export default class ProductsPage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/products", action: this.index },
      { path: "/products/:id", action: this.show }
    ]
  }

  index = options => this.fetch(`/products?${this.query(options)}`, { collection: "products" })

  show = ({ params: { id } }) => this.fetch(`/products/${id}`)
}
