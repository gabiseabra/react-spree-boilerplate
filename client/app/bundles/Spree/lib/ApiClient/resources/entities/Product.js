import Resource from "../Resource"
import { page, get, hydrate } from "../../endpoints/methods"

class Image {
  constructor(data) {
    this.id = data.id
    this.urls = {
      mini: data.mini_url,
      small: data.small_url,
      product: data.product_url,
      large: data.large_url
    }
    this.contentType = data.attachment_content_type
    this.width = data.attachment_width
    this.height = data.attachment_height
    this.alt = data.alt
  }
}

const images = data => data.map(img => new Image(img))

const properties = data => data.map(prop => ({
  name: prop.property_name,
  value: prop.value
}))

export default class Product extends Resource {
  static baseUrl = "/api/v1/products"

  static collection = "products"

  static endpoints = {
    page: page(Product),
    get: get(Product),
    hydrate: hydrate(Product)
  }

  constructor(data) {
    super()
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.price = parseFloat(data.price) || undefined
    this.inStock = data.master.in_stock
    this.images = images(data.master.images)
    this.properties = properties(data.product_properties)
    this.taxonIds = data.taxon_ids
  }

  static hydrate({ products }) {
    if(products) {
      return { products: products.map(data => new Product(data)) }
    }
    return {}
  }

  get permalink() {
    return `/products/${this.slug}`
  }

  get props() { return this.properties }
}
