import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Cart } from "../../components/cart"
import { getCsrfToken } from "../../redux/selectors/auth"
import { getOrder, isOrderLoading, getLineItems } from "../../redux/selectors/cart"
import { empty, edit, remove } from "../../redux/modules/cart"
import Coupon from "./Coupon"

class CartApp extends Component {
  static propTypes = {
    csrfToken: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    empty: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
  }

  onClear = () => {
    this.props.empty()
  }

  onRemove = (lineItemId) => {
    this.props.remove(lineItemId)
  }

  onChange = (lineItemId, quantity) => {
    this.props.edit(lineItemId, quantity)
  }

  render() {
    const { csrfToken, loading, order, lineItems } = this.props
    return (
      <Cart
        csfrToken={csrfToken}
        loading={loading}
        order={order}
        lineItems={lineItems}
        onClear={this.onClear}
        onChange={this.onChange}
        onRemove={this.onRemove}
        coupon={<Coupon />} />
    )
  }
}

const props = state => ({
  order: getOrder(state),
  loading: isOrderLoading(state),
  lineItems: getLineItems(state),
  csrfToken: getCsrfToken(state)
})

export default connect(props, { empty, remove, edit })(CartApp)
