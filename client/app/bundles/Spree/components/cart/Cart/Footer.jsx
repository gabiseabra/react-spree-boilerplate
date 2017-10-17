import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Button } from "react-bootstrap"
import { Price } from "../../shared"
import Adjustments from "../Adjustments"

const CartFooter = ({ order, onClear }) => (
  <tfoot>
    <Adjustments colSpan={4} order={order} />
    <tr>
      <td colSpan={3}>
        <Button bsStyle="danger" onClick={onClear}>
          <FormattedMessage {...messages.emptyCart} />
        </Button>
        <Link to="/products">
          <Button bsStyle="link">
            <FormattedMessage {...messages.continueShopping} />
          </Button>
        </Link>
      </td>
      <td><Price value={order.price.total} /></td>
    </tr>
  </tfoot>
)

CartFooter.propTypes = {
  order: PropTypes.object.isRequired,
  onClear: PropTypes.func
}

export default CartFooter
