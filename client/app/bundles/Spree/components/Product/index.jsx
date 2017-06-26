import React from "react"
import PropTypes from "prop-types"
import { Card, Image } from "semantic-ui-react"
import { Product as Entity } from "../../lib/ApiClient/models"

const Product = ({ product }) => {
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

Product.propTypes = {
  product: PropTypes.instanceOf(Entity).isRequired
}

export default Product
