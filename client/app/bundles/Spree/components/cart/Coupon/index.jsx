import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap"
import { LoadingButton } from "../../shared"
import styles from "./Coupon.scss"

export default class Coupon extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    success: PropTypes.string,
    error: PropTypes.instanceOf(Error),
    onSubmit: PropTypes.func
  }

  state = {
    code: ""
  }

  onKeyPress = (e) => {
    if(e.charCode === 13) {
      this.onSubmit()
      e.preventDefault()
    }
  }

  onChange = (e) => {
    this.setState({ code: e.target.value })
  }

  onSubmit = () => {
    const code = this.state.code.trim()
    const { onSubmit } = this.props
    if(code && onSubmit) onSubmit(code)
  }

  render() {
    const { code } = this.state
    const { loading, success, error } = this.props
    return (
      <div>
        {error && <Alert bsStyle="warning">{error.message}</Alert>}
        {success && <Alert bsStyle="success">{success}</Alert>}
        <div className={styles.form}>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.coupon} />
            </ControlLabel>
            <FormControl
              type="string"
              value={code}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress} />
          </FormGroup>
          <LoadingButton loading={loading} onClick={this.onSubmit}>
            <FormattedMessage {...messages.applyCoupon} />
          </LoadingButton>
        </div>
      </div>
    )
  }
}
