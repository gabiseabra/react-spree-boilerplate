import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class HomePage extends Endpoint {
  path = "/"

  Entity = Product

  index = (options) => {
    const query = this.query.paginate(options)
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }

}
