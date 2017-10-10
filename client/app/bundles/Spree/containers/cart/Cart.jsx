import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Cart } from "../../components/cart"
import { getOrder, getLineItems } from "../../redux/selectors/cart"
import { empty } from "../../redux/modules/cart"

class CartApp extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    empty: PropTypes.func.isRequired
  }

  onClear = () => {
    this.props.empty()
  }

  render() {
    const { order, lineItems } = this.props
    return (
      <Cart
        order={order}
        lineItems={lineItems}
        onClear={this.onClear} />
    )
  }
}

const props = state => ({
  order: getOrder(state),
  lineItems: getLineItems(state)
})

export default connect(props, { empty })(CartApp)
