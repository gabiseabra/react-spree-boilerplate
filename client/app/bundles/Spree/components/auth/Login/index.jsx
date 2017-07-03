import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Message } from "semantic-ui-react"

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
      <Form onSubmit={this.onSubmit} warning={Boolean(error)}>
        {error && <Message warning content={error.message} />}
        <Form.Input
          value={login}
          name="login"
          label="Username"
          placeholder="Username"
          onChange={this.onChange} />
        <Form.Input
          value={password}
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          onChange={this.onChange} />
        <Form.Checkbox
          value={rememberMe}
          name="rememberMe"
          label="Remember Me"
          onChange={this.onChange} />
        <Form.Button type="submit" loading={loading}>Login</Form.Button>
      </Form>
    )
  }
}
