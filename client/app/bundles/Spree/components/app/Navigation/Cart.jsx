import React from "react"
import PropTypes from "prop-types"

const CartPreview = ({ order }) => (
  <ul className="nav navbar-nav">
    <li role="presentation">
      <a href="/cart">
        Cart {(order && `($${order.price.total})`)}
      </a>
    </li>
  </ul>
)

CartPreview.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartPreview
