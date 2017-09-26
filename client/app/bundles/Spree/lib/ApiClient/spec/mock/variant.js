const option = (variant, id, { name, presentation }) => ({
  id,
  name: presentation,
  presentation,
  option_type_id: id,
  option_type_name: name,
  option_type_presentation: presentation
})

export default (product, id = 1, { slug, name, optionTypes } = {}, isMaster = false) => {
  const variant = {
    id,
    slug: slug || "product_name",
    name: name || "Product Name",
    price: 100.00,
    in_stock: true,
    is_master: isMaster,
    images: [],
    option_values: []
  }
  if(optionTypes) {
    for(let i = 1; i < optionTypes.length; ++i) {
      variant.option_values.push(option(id, i + 1, optionTypes[i]))
    }
  }
  return variant
}
