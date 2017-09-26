import React from "react"
import PropTypes from "prop-types"
import { Thumbnail } from "react-bootstrap"

const ProductCard = ({ product }) => {
  const img = product.images[0]
  return (
    <Thumbnail href={product.permalink} src={img.urls.product} alt={img.alt}>
      <a href={product.permalink}>
        <h2>{product.name}</h2>
      </a>
    </Thumbnail>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductCard
