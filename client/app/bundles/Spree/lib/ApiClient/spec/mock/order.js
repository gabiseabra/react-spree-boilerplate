import lineItem from "./lineItem"

export default (id = 1, { state, lineItems } = {}) => ({
  id,
  token: `ORDETOKEN${id}`,
  number: `ORDERNUM${id}`,
  state: state || "cart",
  quantity: 0,
  line_items: (lineItems || []).map((item, i) => lineItem(i + 1, item))
})
