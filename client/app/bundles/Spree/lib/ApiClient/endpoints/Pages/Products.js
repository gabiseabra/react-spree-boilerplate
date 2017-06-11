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

  index = (options = {}) => {
    const query = this.query.paginate(options)
    return this.fetch(`/products?${query}`)
  }

  show = ({ params: { id } }) => this.fetch(`/products/${id}`)
}
