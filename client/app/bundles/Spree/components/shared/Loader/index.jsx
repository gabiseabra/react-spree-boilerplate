import React, { Component } from "react"
import PropTypes from "prop-types"

class Content extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(next) {
    return next.loading === false
  }

  render() {
    return this.props.children || <div />
  }
}

const Loader = ({ loading, children }) => (
  <div>
    {/* loading && <Spinner /> */}
    <Content loading={loading}>{children}</Content>
  </div>
)

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default Loader
