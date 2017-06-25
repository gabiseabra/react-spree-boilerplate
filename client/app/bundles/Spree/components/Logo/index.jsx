import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./Logo.css"

const SIZES = [ "small", "default", "large", "auto" ]

const Logo = ({ className, size, ...props }) => {
  let logoClass = classNames(styles.Logo, className)
  let imageStyle = {}
  if(SIZES.indexOf(size) !== -1) {
    logoClass = classNames(logoClass, styles[`Logo--${size}`])
  } else if(size) {
    imageStyle = { width: size, height: size }
  }
  return (
    <div className={logoClass} {...props}>
      <img
        style={imageStyle}
        src={require("images/logo.svg")}
        alt="React Spree Boilerplate" />
      <span>React Spree Boilerplate</span>
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.any,
  size: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
}

Logo.defaultProps = {
  size: "default"
}

export default Logo
