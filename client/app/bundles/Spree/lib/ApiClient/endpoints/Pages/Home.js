import Endpoint from "../Endpoint"
import parseQuery from "./parseQuery"
import { Product } from "../../models"

export default class HomePage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/", action: this.index }
    ]
  }

  index = options => this.fetch(`/?${parseQuery(options)}`, { collection: "products" })
}
