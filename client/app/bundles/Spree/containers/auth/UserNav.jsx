import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withContext } from "app/components"
import { UserNav } from "../../components/auth"
import { logout } from "../../redux/modules/auth"
import {
  getLoggedInUser,
  getAuthError,
  isAuthLoading
} from "../../redux/selectors"

class UserNavApp extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  onLogout = () => this.props.logout()

  render() {
    const { user, error, loading, children } = this.props
    return (
      <UserNav
        user={user}
        error={error}
        loading={loading}
        onLogout={this.onLogout}>
        {children}
      </UserNav>
    )
  }
}

const props = state => ({
  user: getLoggedInUser(state),
  error: getAuthError(state),
  loading: isAuthLoading(state)
})

export default withContext(connect(props, { logout })(UserNavApp))
