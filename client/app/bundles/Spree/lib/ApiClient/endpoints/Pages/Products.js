import Endpoint from "../Endpoint"
import parseQuery from "./parseQuery"
import { Product } from "../../models"

export default class ProductsPage extends Endpoint {
  routes() {
    return [
      { path: "/products", action: this.index },
      { path: "/products/:id", action: ({ params: { id } }) => this.show(id) }
    ]
  }

  index(options) {
    return this.fetch(`/products?${parseQuery(options)}`, {
      Entity: Product,
      collection: "products"
    })
  }

  show({ params: { id } }) {
    return this.fetch(`/products/${id}`, {
      Entity: Product
    })
  }
}
