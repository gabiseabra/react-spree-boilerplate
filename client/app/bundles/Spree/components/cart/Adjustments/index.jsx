import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Price } from "../../shared"

const Adjustments = ({ order, colSpan }) => {
  const { items, tax, shipping, adjustment } = order.price
  const components = []
  if(tax) {
    components.push(
      <tr key="tax">
        <td colSpan={colSpan - 1}>
          <FormattedMessage {...messages.taxTotal} />
        </td>
        <td><Price value={tax} /></td>
      </tr>
    )
  }
  if(shipping) {
    components.push(
      <tr key="shipping">
        <td colSpan={colSpan - 1}>
          <FormattedMessage {...messages.shippingTotal} />
        </td>
        <td><Price value={shipping} /></td>
      </tr>
    )
  }
  if(adjustment) {
    components.push(
      <tr key="adjustment">
        <td colSpan={colSpan - 1}>
          <FormattedMessage {...messages.adjustmentTotal} />
        </td>
        <td><Price value={adjustment} /></td>
      </tr>
    )
  }
  if(components.length) {
    components.unshift(
      <tr key="items">
        <td colSpan={colSpan - 1}>
          <FormattedMessage {...messages.itemsTotal} />
        </td>
        <td><Price value={items} /></td>
      </tr>
    )
  }
  return components
}

Adjustments.propTypes = {
  order: PropTypes.object.isRequired
}

export default Adjustments
