import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { auth as messages } from "app/locales/messages"
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap"
import { Modal } from "../../shared"

export default class UserNav extends Component {
  static propTypes = {
    user: PropTypes.object,
    // loading: PropTypes.bool.isRequired,
    // error: PropTypes.instanceOf(Error),
    onLogout: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  componentWillReceiveProps(next) {
    // Close modal on successful login
    if(next.user !== this.props.user) {
      this.hideModal()
    }
  }

  hideModal = () => this.modal.hide()

  showModal = () => this.modal.show()

  renderModal() {
    const { children } = this.props
    return (
      <Modal ref={(x) => { this.modal = x }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage {...messages.login} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    )
  }

  renderGuestMenu() {
    return (
      <Nav>
        {this.renderModal()}
        <NavItem onSelect={this.showModal}>
          <FormattedMessage {...messages.login} />
        </NavItem>
      </Nav>
    )
  }

  renderUserMenu() {
    const { onLogout } = this.props
    return (
      <Nav>
        <NavDropdown id="UserNav-options" title={<FormattedMessage {...messages.account} />}>
          <MenuItem href="/account">
            <FormattedMessage {...messages.myAccount} />
          </MenuItem>
          <MenuItem divider />
          <MenuItem onSelect={onLogout}>
            <FormattedMessage {...messages.logout} />
          </MenuItem>
        </NavDropdown>
      </Nav>
    )
  }

  render() {
    const { user } = this.props
    return (user ? this.renderUserMenu() : this.renderGuestMenu())
  }
}
