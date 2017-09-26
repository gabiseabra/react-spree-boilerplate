import React, { Component } from "react"
import PropTypes from "prop-types"
import { Menu, Modal } from "react-bootstrap"
import { Login } from "../../auth"

export default class UserNav extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
    user: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  }

  state = { active: false }

  componentWillReceiveProps(next) {
    // Close modal on successful login
    if(next.user !== this.props.user) {
      this.hide()
    }
  }

  show = () => this.setState({ active: true })

  hide = () => this.setState({ active: false })

  renderModal() {
    const { user, error, loading, onLogin } = this.props
    return (
      <Modal show={this.state.active} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            user={user}
            error={error}
            loading={loading}
            onSubmit={onLogin} />
        </Modal.Body>
      </Modal>
    )
  }

  renderGuestMenu() {
    return (
      <Menu.Menu>
        {this.renderModal()}
        <Menu.Item onClick={this.show}>Login</Menu.Item>
      </Menu.Menu>
    )
  }

  renderUserMenu() {
    const { user, onLogout } = this.props
    return (
      <Menu.Menu>
        <Menu.Item>{user.email}</Menu.Item>
        <Menu.Item onClick={onLogout}>Logout</Menu.Item>
      </Menu.Menu>
    )
  }

  render() {
    return (this.props.user ? this.renderUserMenu() : this.renderGuestMenu())
  }
}
