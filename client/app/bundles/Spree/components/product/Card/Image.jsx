import React from "react"
import PropTypes from "prop-types"

const ProductImage = ({ product }) => {
  const img = product.images[0]
  return (
    <a href={product.permalink}>
      <img src={img.urls.product} alt={img.alt} />
    </a>
  )
}

ProductImage.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductImage
