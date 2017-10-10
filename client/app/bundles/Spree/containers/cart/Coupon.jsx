import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Coupon } from "../../components/cart"
import {
  isCouponLoading,
  getCouponError,
  getCouponMessage
} from "../../redux/selectors/cart"
import { applyCoupon } from "../../redux/modules/cart"

class CouponApp extends Component {
  static propTypes = {
    message: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    applyCoupon: PropTypes.func.isRequired
  }

  onSubmit = (code) => {
    this.props.applyCoupon(code)
  }

  render() {
    const { loading, message, error } = this.props
    return (
      <Coupon
        success={message}
        loading={loading}
        error={error}
        onSubmit={this.onSubmit} />
    )
  }
}

const props = state => ({
  message: getCouponMessage(state),
  loading: isCouponLoading(state),
  error: getCouponError(state)
})

export default connect(props, { applyCoupon })(CouponApp)
