import Endpoint from "./Endpoint"
import Product from "../models/Product"

export default class Products extends Endpoint {
  Entity = Product

  get = (id) => this.api.fetch(`/api/v1/products/${id}`).then(this.parse)

  getPage = (options) => {
    const query = this.query.paginate(options)
    return this.fetch(`/api/v1/products/?${query}`)
  }

  search = (predicates) => {
    const query = this.query.search(predicates)
    return this.fetch(`/api/v1/products/?${query}`)
  }
}
