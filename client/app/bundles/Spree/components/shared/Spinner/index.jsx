import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Spinner.scss"

const Spinner = ({ className, center, ...props }) => {
  const spinnerClass = classnames(
    className,
    styles.Spinner,
    center && styles.center
  )
  return (
    <div className={spinnerClass} {...props} />
  )
}

Spinner.propTypes = {
  className: PropTypes.any,
  center: PropTypes.bool.isRequired
}

Spinner.defaultProps = {
  center: false
}

export default Spinner
