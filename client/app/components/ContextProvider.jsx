import React from "react"
import PropTypes from "prop-types"

export default class ContextProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired
  }

  static childContextTypes = {
    railsContext: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      railsContext: this.props.context
    }
  }

  render() {
    return this.props.children
  }
}

export const withContext = Component => (props, railsContext) => (
  <ContextProvider context={railsContext}>
    <Component {...props} />
  </ContextProvider>
)
