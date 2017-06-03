import qs from "querystring"
import Endpoint from "./Endpoint"

export class Product {
  constructor(data) {
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.price = parseFloat(data.price) || undefined
  }
}

export default class Products extends Endpoint {
  path = "/api/v1/products"

  Entity = Product

  get(id) {
    return this.api.fetch(`${this.path}/${id}`)
      .then(this.parse)
  }

  getPage(page = 1, count) {
    const query = qs.stringify({ page, per_page: count })
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }

  search(term, predicate = "name_cont") {
    const query = qs.stringify({ [`q[${predicate}]`]: term })
    return this.api.fetch(`${this.path}/?${query}`)
      .then(this.parseAll)
  }
}
