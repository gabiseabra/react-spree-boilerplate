import React from "react"
import PropTypes from "prop-types"

const ProductImage = ({ product }) => {
  const img = product.images[0]
  return (
    <img itemProp="image" src={img.urls.product} alt={img.alt} />
  )
}

ProductImage.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductImage
