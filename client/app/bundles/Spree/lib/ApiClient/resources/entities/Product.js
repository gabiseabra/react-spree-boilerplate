import Resource from "../Resource"
import Variant from "./Variant"

const properties = data => data.map(prop => ({
  name: prop.property_name,
  value: prop.value
}))

const optionTypes = (data) => {
  const result = {}
  data.forEach((opt) => {
    result[opt.id] = {
      id: opt.id,
      name: opt.name,
      presentation: opt.presentation,
      position: opt.position
    }
  })
  return result
}

export default class Product extends Resource {
  static collection = "products"

  constructor(data) {
    super()
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.hasVariants = data.has_variants
    this.master = new Variant(data.master)
    this.variants = data.variants.map(item => new Variant(item))
    this.properties = properties(data.product_properties)
    this.optionTypes = optionTypes(data.option_types)
    this.taxonIds = data.taxon_ids
    this.permalink = `/products/${data.slug}`
  }
}
