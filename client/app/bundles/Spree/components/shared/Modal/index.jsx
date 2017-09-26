import React, { Component } from "react"
import PropTypes from "prop-types"
import { Modal } from "react-bootstrap"

class ControlledModal extends Component {
  static propTypes = {
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
        {children}
      </Modal>
    )
  }
}

ControlledModal.Header = Modal.Header
ControlledModal.Title = Modal.Title
ControlledModal.Body = Modal.Body
ControlledModal.Footer = Modal.Footer

export default ControlledModal
