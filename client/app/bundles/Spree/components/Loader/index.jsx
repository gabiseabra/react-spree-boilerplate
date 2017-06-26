import React, { Component } from "react"
import PropTypes from "prop-types"
import { Dimmer, Loader as LoadingIndicator } from "semantic-ui-react"

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
  <Dimmer.Dimmable dimmed={loading} blurring>
    <Dimmer active={loading}>
      <LoadingIndicator />
    </Dimmer>
    <Content loading={loading}>{children}</Content>
  </Dimmer.Dimmable>
)

Loader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Loader
