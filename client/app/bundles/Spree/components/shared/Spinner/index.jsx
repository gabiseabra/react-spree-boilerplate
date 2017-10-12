import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Spinner.scss"

const Spinner = ({ className, size, center, ...props }) => {
  const spinnerClass = classnames(
    className,
    styles.Spinner,
    styles[`size--${size}`],
    center && styles.center
  )
  return (
    <div className={spinnerClass} {...props} />
  )
}

Spinner.propTypes = {
  className: PropTypes.any,
  size: PropTypes.string.isRequired,
  center: PropTypes.bool.isRequired
}

Spinner.defaultProps = {
  center: false,
  size: "default"
}

export default Spinner
