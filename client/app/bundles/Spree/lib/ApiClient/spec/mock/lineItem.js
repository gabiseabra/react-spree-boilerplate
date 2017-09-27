import variant from "./variant"

export default (id = 1, { quantity, variantId } = {}) => ({
  id,
  quantity,
  price: "10.99",
  total: (10.99 * quantity).toString(),
  variant_id: variantId || 1,
  variant: variant(id, variantId || 1)
})
