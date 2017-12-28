import React from "react"
import PropTypes from "prop-types"

const ProductImage = ({ product }) => {
  const img = product.images[0]
  const url = img ? img.urls.product : require("images/no_image.png")
  const alt = img ? img.alt : undefined
  return (
    <img itemProp="image" src={url} alt={alt} />
  )
}

ProductImage.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductImage
