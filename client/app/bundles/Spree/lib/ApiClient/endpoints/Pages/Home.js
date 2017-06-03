import Endpoint from "../Endpoint"
import { Product } from "../Products"

export default class HomePage extends Endpoint {
  path = "/"

  Entity = Product

  index(page = 1) {
    return this.api.fetch(`${this.path}/?page=${page}`)
      .then(this.parseAll)
  }
}
