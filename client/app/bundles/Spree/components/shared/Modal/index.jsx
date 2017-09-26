import React, { Component } from "react"
import PropTypes from "prop-types"
import { Modal } from "react-bootstrap"

export default class ControlledModal extends Component {
  propTypes = {
    children: PropTypes.node.isRequired
  }

  state = { active: false }

  show = () => this.setState({ active: true })

  hide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const { children } = this.props
    return (
      <Modal show={active} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    )
  }
}
