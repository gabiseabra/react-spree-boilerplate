import React from "react"
import PropTypes from "prop-types"
import { Nav } from "react-bootstrap"

const CartPreview = ({ order }) => (
  <Nav>
    <li role="presentation">
      <a href="/cart">
        Cart {(order && `($${order.price.total})`)}
      </a>
    </li>
  </Nav>
)

CartPreview.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartPreview
