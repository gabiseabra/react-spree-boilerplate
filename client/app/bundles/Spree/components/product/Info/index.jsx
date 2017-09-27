import React from "react"
import PropTypes from "prop-types"
import Slideshow from "../Slideshow"
// import {  } from "react-bootstrap"

const ProductInfo = ({ product, options }) => (
  <div>
    {product.name}
    <Slideshow variant={product.master} />
    {options}
  </div>
)

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
}

export default ProductInfo
