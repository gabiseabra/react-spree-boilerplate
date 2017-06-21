import Endpoint from "../Endpoint"
import { Product } from "../../models"

export default class HomePage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/", action: this.index }
    ]
  }

  index = options => this.api.fetch(`/?${this.query(options)}`, { collection: "products" })
}
