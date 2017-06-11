import Endpoint from "./Endpoint"
import Product from "../models/Product"

export default class Products extends Endpoint {
  path = "/api/v1/products"

  Entity = Product

  get = (id) => this.api.fetch(`${this.path}/${id}`).then(this.parse)

  getPage = (options) => {
    const query = this.query.paginate(options)
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }

  search = (predicates) => {
    const query = this.query.search(predicates)
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }
}
