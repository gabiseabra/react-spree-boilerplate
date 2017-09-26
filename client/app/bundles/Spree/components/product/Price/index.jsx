import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Price.css"

const Price = ({ product, size, className, ...props }) => {
  const priceClass = classnames(
    className,
    styles.Price,
    styles[`Price--${size}`]
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
  size: PropTypes.oneOf([ "small", "default" ]),
  className: PropTypes.any
}

Price.defaultProps = {
  size: "default"
}

export default Price
