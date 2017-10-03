import React, { Component } from "react"
import PropTypes from "prop-types"

class Content extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  shouldComponentUpdate(next) {
    return next.loading === false
  }

  render() {
    return this.props.children
  }
}

const Loader = ({ loading, children }) => (
  <div>
    {/* loading && <Spinner /> */}
    <Content loading={loading}>{children}</Content>
  </div>
)

Loader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Loader
