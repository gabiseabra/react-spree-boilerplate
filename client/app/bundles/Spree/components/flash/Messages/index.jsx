import React, { Component } from "react"
import PropTypes from "prop-types"
import { Alert } from "react-bootstrap"

const bsStyle = (type) => {
  switch(type) {
    case "success":
    case "order_completed": return "success"
    case "error": return "danger"
    default: return "info"
  }
}

export default class Messages extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })).isRequired,
    onDismiss: PropTypes.func
  }

  onDismiss = id => () => {
    const { onDismiss } = this.props
    if(onDismiss) onDismiss(id)
  }

  render() {
    const { messages } = this.props
    if(!messages.length) return null
    return (
      <div>
        {messages.map(({ id, type, message }) => (
          <Alert key={id} bsStyle={bsStyle(type)} onDismiss={this.onDismiss(id)}>
            {message}
          </Alert>
        ))}
      </div>
    )
  }
}
