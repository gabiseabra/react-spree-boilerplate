import React from "react"
import PropTypes from "prop-types"
import { Card, Image } from "semantic-ui-react"

const ProductCard = ({ product }) => {
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

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductCard
