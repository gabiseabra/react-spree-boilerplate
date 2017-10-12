import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Badge } from "react-bootstrap"
import { Spinner } from "../../shared"

const CartPreview = ({ loading, order }) => (
  <a href="/cart">
    <FormattedMessage {...messages.cart} />
    {order.quantity &&
    <Badge style={{ position: "relative" }}>
      {loading && <Spinner center size="tiny" />}
      ${order.price.total}
    </Badge>}
  </a>
)

CartPreview.propTypes = {
  loading: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired
}

export default CartPreview
