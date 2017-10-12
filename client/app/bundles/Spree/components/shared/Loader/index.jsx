import React, { Component } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Spinner from "../Spinner"
import styles from "./Loader.scss"

class Content extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(next) {
    return next.loading === false
  }

  render() {
    return (
      <div className={styles.content}>
        {this.props.children}
      </div>
    )
  }
}

const Loader = ({ className, children, loading, dim }) => {
  const loaderClass = classnames(
    className,
    styles.Loader,
    loading && styles.loading,
    dim && styles.dim
  )
  return (
    <div className={loaderClass}>
      {loading && <Spinner center />}
      <Content loading={loading}>{children}</Content>
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.any,
  dim: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node
}

Loader.defaultProps = {
  dim: false
}

export default Loader
