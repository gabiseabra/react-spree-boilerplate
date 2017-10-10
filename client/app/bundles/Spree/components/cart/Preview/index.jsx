import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"

const CartPreview = ({ order }) => (
  <a href="/cart">
    <FormattedMessage {...messages.cart} />
    {(order && `($${order.price.total})`)}
  </a>
)

CartPreview.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartPreview
