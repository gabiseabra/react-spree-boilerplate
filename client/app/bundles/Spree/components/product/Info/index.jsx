import React from "react"
import PropTypes from "prop-types"
// import {  } from "react-bootstrap"

const ProductInfo = ({ product }) => {
  const img = product.images[0]
  return (
    <div>
      <img src={img.urls.product} alt={img.alt} />
    </div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInfo
