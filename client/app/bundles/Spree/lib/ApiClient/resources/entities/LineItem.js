import Variant from "./Variant"
import Resource from "../Resource"

export default class LineItem extends Resource {
  static collection = "line_items"

  constructor(data) {
    super()
    this.id = data.id
    this.quantity = data.quantity
    this.price = parseFloat(data.price)
    this.total = parseFloat(data.total)
    this.variantId = data.variant_id
    this.variant = new Variant(data.variant)
  }
}
