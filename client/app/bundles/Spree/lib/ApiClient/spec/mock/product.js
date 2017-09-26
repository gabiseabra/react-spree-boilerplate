import variant from "./variant"

const property = (product, id, { name, value }) => ({
  id,
  value,
  property_name: name,
  property_id: id,
  product_id: product.id
})

const optionType = (_, id, { name, presentation, position }) => ({
  id,
  name,
  presentation,
  position: position || id
})

export default (id = 1, props = {}) => {
  let i = 1
  const { variants, properties, optionTypes } = props
  const master = variant(id, i, props, true)
  const product = {
    id,
    master,
    slug: master.slug,
    name: master.name,
    description: master.description,
    taxon_ids: props.taxons || [],
    product_properties: [],
    option_types: [],
    variants: []
  }
  if(variants) {
    product.has_variants = true
    for(++i; i < variants.length; ++i) {
      product.variants.push(id, i, variant[variants[i]])
    }
  }
  if(properties) {
    for(let j = 1; j < properties.length; ++j) {
      product.product_properties.push(property(id, j + 1, properties[j]))
    }
  }
  if(optionTypes) {
    for(let j = 1; j < optionTypes.length; ++j) {
      product.option_types.push(optionType(id, j + 1, optionTypes[j]))
    }
  }
  return product
}
