import React from "react"
import PropTypes from "prop-types"

const CartPreview = ({ order }) => (
  <a href="/cart">
    Cart {(order && `($${order.price.total})`)}
  </a>
)

CartPreview.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartPreview
