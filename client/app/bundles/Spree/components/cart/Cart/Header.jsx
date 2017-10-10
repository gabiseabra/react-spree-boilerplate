import React from "react"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"

const CartHeader = () => (
  <thead>
    <tr>
      <th><FormattedMessage {...messages.item} /></th>
      <th><FormattedMessage {...messages.price} /></th>
      <th><FormattedMessage {...messages.quantity} /></th>
      <th><FormattedMessage {...messages.total} /></th>
    </tr>
  </thead>
)

export default CartHeader
