import React from "react"
import PropTypes from "prop-types"
import { Card } from "antd"
import { Product as Entity } from "../../lib/ApiClient/models"

const Product = ({ product }) => {
  const img = product.images[0]
  return (
    <Card>
      <img width="100%" src={img.urls.product} alt={img.alt} />
      <a href={`/products/${product.slug}`}>
        {product.name}
      </a>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.instanceOf(Entity).isRequired
}

export default Product
