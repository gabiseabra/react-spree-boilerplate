import React from "react"
import PropTypes from "prop-types"
import { Card, Image } from "semantic-ui-react"
import { Product } from "../../lib/ApiClient/models"

const ProductInfo = ({ product }) => {
  const img = product.images[0]
  return (
    <Card>
      <Image src={img.urls.product} alt={img.alt} />
      <Card.Content>
        <a href={`/products/${product.slug}`}>
          {product.name}
        </a>
      </Card.Content>
    </Card>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired
}

export default ProductInfo
