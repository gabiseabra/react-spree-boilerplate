import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class HomePage extends Endpoint {
  Entity = Product

  routes() {
    return [
      { path: "/", action: this.index }
    ]
  }

  index = (context) => {
    const query = this.query.paginate(context)
    return this.api.fetch(`/?${query}`, {
      collection: "products"
    })
  }
}
