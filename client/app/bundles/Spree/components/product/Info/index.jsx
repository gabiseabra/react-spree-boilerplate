import React from "react"
import PropTypes from "prop-types"
// import {  } from "react-bootstrap"

const ProductInfo = ({ product }) => {
  return (
    <div>{product.name}</div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInfo
