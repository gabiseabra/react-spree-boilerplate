import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Logo.css"

const Logo = ({ className }) => (
  <div className={classnames(className, styles.Logo)}>
    <img
      src={require("images/logo.svg")}
      alt="React Spree Boilerplate" />
    <span className={styles.title}>React Spree Boilerplate</span>
  </div>
)

Logo.propTypes = {
  className: PropTypes.any
}

export default Logo
