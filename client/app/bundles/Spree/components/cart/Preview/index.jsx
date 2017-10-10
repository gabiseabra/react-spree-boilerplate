import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"

const CartPreview = ({ order }) => (
  <Link to="/cart">
    <FormattedMessage {...messages.cart} />
    {(order && `($${order.price.total})`)}
  </Link>
)

CartPreview.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartPreview
