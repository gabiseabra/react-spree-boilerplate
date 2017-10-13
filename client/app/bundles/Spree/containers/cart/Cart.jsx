import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Cart } from "../../components/cart"
import { getOrder, isOrderLoading, getLineItems } from "../../redux/selectors/cart"
import { empty } from "../../redux/modules/cart"
import Coupon from "./Coupon"

class CartApp extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    empty: PropTypes.func.isRequired
  }

  onClear = () => {
    this.props.empty()
  }

  render() {
    const { loading, order, lineItems } = this.props
    return (
      <Cart
        loading={loading}
        order={order}
        lineItems={lineItems}
        onClear={this.onClear}
        coupon={<Coupon />} />
    )
  }
}

const props = state => ({
  order: getOrder(state),
  loading: isOrderLoading(state),
  lineItems: getLineItems(state)
})

export default connect(props, { empty })(CartApp)
