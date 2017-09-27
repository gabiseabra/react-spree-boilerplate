import variant from "./variant"

const lineItem = (order, id, variantId, { quantity }) => ({
  id,
  quantity,
  price: "10.99",
  total: (10.99 * quantity).toString(),
  adjustments: [],
  variant_id: variantId,
  variant: variant(1, variantId)
})

export default (id = 1, props = {}) => {
  const { lineItems } = props
  const order = {
    id,
    number: `ORDERNUM${id}`,
    state: props.state || "cart",
    userId: props.user || null,
    quantity: 0,
    line_items: []
  }
  if(lineItems) {
    let i = 1
    Object.keys(lineItems).forEach((variantId) => {
      order.line_items.push(lineItem(id, i, variantId, lineItems[variantId]))
      i += 1
    })
  }
  return order
}
