import Endpoint from "../Endpoint"
import parseQuery from "./parseQuery"
import { Product } from "../../models"

export default class HomePage extends Endpoint {
  routes() {
    return [
      { path: "/", action: this.index }
    ]
  }

  index(options) {
    return this.fetch(`/?${parseQuery(options)}`, {
      Entity: Product,
      collection: "products"
    })
  }
}
