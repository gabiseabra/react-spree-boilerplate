import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Badge } from "react-bootstrap"
import { Price, Spinner } from "../../shared"

const CartPreview = ({ loading, order }) => (
  <Link href="/cart">
    <FormattedMessage {...messages.cart} />
    {order.quantity ?
      <Badge style={{ position: "relative" }}>
        {loading && <Spinner center size="tiny" />}
        <Price value={order.price.total} />
      </Badge> :
      undefined}
  </Link>
)

CartPreview.propTypes = {
  loading: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired
}

export default CartPreview
