const property = (product, id, { name, value }) => ({
  id,
  value,
  property_name: name,
  property_id: id,
  product_id: product.id
})

export default (id = 1, { slug, name, taxons, properties } = {}) => {
  const product = {
    id,
    slug: slug || "product_name",
    name: name || "Product Name",
    price: 100.00,
    in_stock: true,
    product_properties: [],
    taxons: taxons || [],
    master: {
      images: []
    }
  }
  if(properties) {
    properties.foreEach((prop, i) => {
      product.product_properties.push(property, i + 1, prop)
    })
  }
  return product
}
