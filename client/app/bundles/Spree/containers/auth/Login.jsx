import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Login } from "../../components/auth"
import { login } from "../../redux/modules/auth"
import {
  getAuthError,
  isAuthLoading
} from "../../redux/selectors/auth"

class LoginApp extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  }

  onLogin = data => this.props.login(data)

  render() {
    const { error, loading } = this.props
    return (
      <Login
        error={error}
        loading={loading}
        onSubmit={this.onLogin} />
    )
  }
}

const props = state => ({
  error: getAuthError(state),
  loading: isAuthLoading(state)
})

export default connect(props, { login })(LoginApp)
