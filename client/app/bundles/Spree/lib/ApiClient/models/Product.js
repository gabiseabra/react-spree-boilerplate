class Image {
  constructor(data) {
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

export default class Product {
  constructor(data) {
    const { parseProperties, parseImages } = this.constructor
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.price = parseFloat(data.price) || undefined
    this.inStock = data.master.in_stock
    this.images = parseImages(data.master.images)
    this.properties = parseProperties(data.product_properties)
  }

  get props() { return this.properties }

  static parseImages(images) {
    return images.map(img => new Image(img))
  }

  static parseProperties(props) {
    return props.map(prop => ({
      name: prop.property_name,
      value: prop.value
    }))
  }
}
