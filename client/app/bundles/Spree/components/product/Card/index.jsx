import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Price from "../Price"
import Image from "./Image"
import styles from "./Card.scss"

const ProductCard = ({ product }) => (
  <a className={styles.Card} href={product.permalink}>
    <div className="thumbnail">
      <Image product={product.master} />
      <div className={classnames("caption", styles.body)}>
        <h3>{product.name}</h3>
        <Price product={product.master} />
      </div>
    </div>
  </a>
)

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductCard
