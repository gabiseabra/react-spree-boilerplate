import React from "react"
import PropTypes from "prop-types"
import { Product as Entity } from "../../lib/ApiClient/models"

const Product = ({ product }) => (
  <div>
    {product.name}
  </div>
)

Product.propTypes = {
  product: PropTypes.instanceOf(Entity).isRequired
}

export default Product
