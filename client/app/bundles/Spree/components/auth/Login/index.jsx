import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage, injectIntl } from "react-intl"
import { auth as messages } from "app/locales/messages"
import {
  Alert,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap"
import { LoadingButton } from "../../shared"

class Login extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    login: "",
    password: "",
    rememberMe: ""
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { intl, error, loading } = this.props
    const { login, password, rememberMe } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        {error && <Alert bsStyle="warning">{error.message}</Alert>}
        <FormGroup controlId="login">
          <ControlLabel>
            <FormattedMessage {...messages.username} />
          </ControlLabel>
          <FormControl
            value={login}
            name="login"
            type="text"
            placeholder={intl.formatMessage(messages.username)}
            onChange={this.onChange} />
        </FormGroup>
        <FormGroup controlId="password">
          <ControlLabel>
            <FormattedMessage {...messages.password} />
          </ControlLabel>
          <FormControl
            value={password}
            name="password"
            type="password"
            label="Password"
            placeholder={intl.formatMessage(messages.password)}
            onChange={this.onChange} />
        </FormGroup>
        <Checkbox
          value={rememberMe}
          name="rememberMe"
          onChange={this.onChange}>
          <FormattedMessage {...messages.rememberMe} />
        </Checkbox>
        <LoadingButton type="submit" loading={loading}>
          <FormattedMessage {...messages.login} />
        </LoadingButton>
      </form>
    )
  }
}

export default injectIntl(Login)
