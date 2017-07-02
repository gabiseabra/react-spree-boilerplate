import React, { Component } from "react"
import PropTypes from "prop-types"
import { Menu, Modal } from "semantic-ui-react"
import { User } from "../../lib/ApiClient/models"
import Login from "../Login"

export default class UserNav extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
    user: PropTypes.instanceOf(User),
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
      <Modal
        open={this.state.active}
        onClose={this.hide}
        size="small"
        closeIcon>
        <Modal.Content>
          <Login
            user={user}
            error={error}
            loading={loading}
            onSubmit={onLogin} />
        </Modal.Content>
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
