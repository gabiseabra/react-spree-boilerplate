import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Alert,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap"
import { LoadingButton } from "../../shared"

export default class Login extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    login: "",
    password: "",
    rememberMe: ""
  }

  onChange = (_, { name, value }) => this.setState({ [name]: value })

  onSubmit = () => this.props.onSubmit(this.state)

  render() {
    const { error, loading } = this.props
    const { login, password, rememberMe } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        {error && <Alert bsStyle="warning">{error.message}</Alert>}
        <FormGroup controlId="login">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={login}
            name="login"
            type="text"
            placeholder="Username"
            onChange={this.onChange} />
        </FormGroup>
        <FormGroup controlId="password">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={password}
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            onChange={this.onChange} />
        </FormGroup>
        <Checkbox
          value={rememberMe}
          name="rememberMe"
          onChange={this.onChange}>
          Remember Me
        </Checkbox>
        <LoadingButton type="submit" loading={loading}>Login</LoadingButton>
      </form>
    )
  }
}
