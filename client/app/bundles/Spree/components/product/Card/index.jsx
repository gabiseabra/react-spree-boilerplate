import React from "react"
import PropTypes from "prop-types"
import { Thumbnail, Button } from "react-bootstrap"
import Price from "../Price"
import Image from "./Image"
import styles from "./Card.css"

const ProductCard = ({ product }) => (
  <Thumbnail className={styles.Card}>
    <Image product={product.master} />
    <div className={styles.body}>
      <h3><a href={product.permalink}>{product.name}</a></h3>
    </div>
    <div className={styles.controls}>
      <Price product={product.master} />
      <Button>Add to Cart</Button>
    </div>
  </Thumbnail>
)

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductCard
