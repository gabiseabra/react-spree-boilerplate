import crossroads from "crossroads"
import Endpoint from "../Endpoint"
import { Product } from "../../models/Product"

export default class HomePage extends Endpoint {
  path = "/"

  Entity = Product

  constructor(apiClient) {
    const router = crossroads.create()
    super(apiClient, router)
    router.addRoute(`${this.path}:?query:`, this.index)
  }

  index = (options = {}) => {
    const query = this.query.paginate(options)
    return this.api.fetch(`${this.path}?${query}`, {
      collection: "products"
    })
  }
}
