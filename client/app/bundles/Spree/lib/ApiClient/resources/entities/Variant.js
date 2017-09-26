import Resource from "../Resource"

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

const options = (data) => {
  const result = {}
  data.forEach((opt) => {
    result[opt.option_type_id] = {
      id: opt.id,
      value: opt.name,
      display: opt.presentation
    }
  })
  return result
}

export default class Variant extends Resource {
  static collection = "products"

  static endpoints = {
    // page: async function (product) {}
  }

  static href(product, id) {
    if(!product) return "/api/v1/variants"
    if(!id) return `/api/v1/products/${product}/variants`
    return `/api/v1/products/${product}/variants/${id}`
  }

  constructor(data) {
    super()
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.price = parseFloat(data.price) || undefined
    this.inStock = data.in_stock
    this.images = images(data.images)
    this.options = options(data.option_values)
  }

  get href() {
    return this.constructor.href(this.slug, this.id)
  }
}
