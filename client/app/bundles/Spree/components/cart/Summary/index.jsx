import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Table } from "react-bootstrap"
import { Price } from "../../shared"
import Adjustments from "../Adjustments"

const CartSummary = ({ order }) => (
  <Table striped>
    <tbody>
      <Adjustments colSpan={2} order={order} />
      <tr>
        <td>
          <FormattedMessage {...messages.total} />
        </td>
        <td>
          <Price value={order.price.total} />
        </td>
      </tr>
    </tbody>
  </Table>
)

CartSummary.propTypes = {
  order: PropTypes.object.isRequired
}

export default CartSummary
