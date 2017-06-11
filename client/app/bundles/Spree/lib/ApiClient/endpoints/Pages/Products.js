import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class ProductsPage extends Endpoint {
  path = "/products"

  Entity = Product

  index = (options) => {
    const query = this.query.paginate(options)
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }

  show = (id) => this.api.fetch(`${this.path}/${id}`).then(this.parse)
}
