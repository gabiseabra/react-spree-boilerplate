import React from "react"
import PropTypes from "prop-types"
import { Card, Image } from "semantic-ui-react"

const ProductInfo = ({ product }) => {
  const img = product.images[0]
  return (
    <Card>
      <Image src={img.urls.product} alt={img.alt} />
      <Card.Content>
        <a href={product.permalink}>
          {product.name}
        </a>
      </Card.Content>
    </Card>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInfo
