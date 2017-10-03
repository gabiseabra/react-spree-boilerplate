import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Price.scss"

const Price = ({ product, className, ...props }) => {
  const priceClass = classnames(
    className,
    styles.Price
  )
  return (
    <div className={priceClass} {...props}>
      <span className={styles.currency}>$</span>
      <span className={styles.price}>{product.price}</span>
    </div>
  )
}

Price.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.any
}

export default Price
