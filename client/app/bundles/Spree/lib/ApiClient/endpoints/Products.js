import Endpoint from "./Endpoint"
import Product from "../models/Product"

export default class Products extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/api/products/:id", action: this.show }
    ]
  }

  show = ({ params: { id } }) => this.api.fetch(`/api/v1/products/${id}`)
}
