import Endpoint from "./Endpoint"
import { Product } from "../models"

export default class Products extends Endpoint {
  routes = () => [
    {
      path: "/api/products/:id",
      action: ({ params: { id } }) => this.get(id)
    }
  ]

  get(id) {
    return this.fetch(`/api/v1/products/${id}`, { Entity: Product })
  }
}
