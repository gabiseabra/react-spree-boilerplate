import Endpoint from "../Endpoint"
import { Product } from "../Products"

export default class ProductsPage extends Endpoint {
  path = "/products"

  Entity = Product

  index(page = 1) {
    return this.api.fetch(`${this.path}/?page=${page}`)
      .then(this.parseAll)
  }

  show(id) {
    return this.api.fetch(`${this.path}/${id}`)
      .then(this.parse)
  }
}
