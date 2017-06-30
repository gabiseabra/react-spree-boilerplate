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

export const withContextInjector = Component => (props, railsContext) => (
  <ContextProvider context={railsContext}>
    <Component {...props} />
  </ContextProvider>
)

export const withContext = Component => (
  // eslint-disable-next-line
  class extends React.Component {
    static contextTypes = {
      railsContext: PropTypes.object.isRequired
    }

    render() {
      const props = this.props
      const { railsContext } = this.context
      return <Component {...props} railsContext={railsContext} />
    }
  }
)
