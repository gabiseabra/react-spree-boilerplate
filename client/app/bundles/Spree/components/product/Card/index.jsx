import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"
import { product as messages } from "app/locales/messages"
import { Label } from "react-bootstrap"
import { Price } from "../../shared"
import Image from "./Image"
import styles from "./Card.scss"

const ProductCard = ({ product, itemProp }) => {
  const availability = (product.inStock ? "inStock" : "OutOfStock")
  return (
    <Link
      className={styles.Card}
      itemProp="url"
      to={product.permalink}
      data-instock={product.inStock}>
      <div
        itemScope
        itemProp={itemProp}
        itemType="http://schema.org/Product"
        className="thumbnail">
        <Image product={product.master} />
        <div className={classnames("caption", styles.body)}>
          <h3 itemProp="name">{product.name}</h3>
          <span itemScope itemProp="offers">
            <Price itemProp="price" value={product.master.price} />
            <link itemProp="availability" href={`http://schema.org/${availability}`} />
            {!product.inStock &&
            <Label className={styles.availability}>
              <FormattedMessage {...messages[availability]} />
            </Label>}
          </span>
        </div>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
  itemProp: PropTypes.string,
  product: PropTypes.object.isRequired
}

export default ProductCard
