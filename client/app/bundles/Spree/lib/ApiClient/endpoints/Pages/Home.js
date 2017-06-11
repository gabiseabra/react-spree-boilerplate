import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class HomePage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/", action: this.index }
    ]
  }

  index = ({ queryString }) => this.api.fetch(`/?${queryString}`, { collection: "products" })
}
