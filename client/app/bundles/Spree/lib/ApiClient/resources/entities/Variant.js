import Resource from "../Resource"

const image = ({ id, alt, ...data }) => ({
  id,
  alt,
  contentType: data.attachment_content_type,
  width: data.width,
  height: data.height,
  urls: {
    mini: data.mini_url,
    small: data.small_url,
    product: data.product_url,
    large: data.large_url
  }
})

const options = (data) => {
  const result = {}
  data.forEach((opt) => {
    result[opt.option_type_id] = {
      id: opt.id,
      value: opt.name,
      presentation: opt.presentation
    }
  })
  return result
}

export default class Variant extends Resource {
  static collection = "products"

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
    this.images = data.images.map(img => image(img))
    this.options = options(data.option_values)
  }

  static hydrate({ variants }) {
    if(variants) {
      return { variants: variants.map(data => new Variant(data)) }
    }
    return {}
  }

  get href() {
    return this.constructor.href(this.slug, this.id)
  }
}
