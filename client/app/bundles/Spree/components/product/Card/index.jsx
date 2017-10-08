import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import classnames from "classnames"
import Price from "../Price"
import Image from "./Image"
import styles from "./Card.scss"

const ProductCard = ({ product, itemProp }) => (
  <Link itemProp="url" className={styles.Card} to={product.permalink}>
    <div
      itemScope
      itemProp={itemProp}
      itemType="http://schema.org/Product"
      className="thumbnail">
      <Image product={product.master} />
      <div className={classnames("caption", styles.body)}>
        <h3 itemProp="name">{product.name}</h3>
        <span itemScope itemProp="offers">
          <Price itemProp="price" product={product.master} />
        </span>
      </div>
    </div>
  </Link>
)

ProductCard.propTypes = {
  itemProp: PropTypes.string,
  product: PropTypes.object.isRequired
}

export default ProductCard
