import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class HomePage extends Endpoint {
  path = "/"

  Entity = Product

  index(page = 1) {
    return this.api.fetch(`${this.path}/?page=${page}`)
      .then(this.parseAll)
  }
}
