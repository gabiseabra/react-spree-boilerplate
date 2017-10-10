import React from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
// import { FormattedMessage } from "react-intl"
// import { cart as messages } from "app/locales/messages"

const LineItem = ({ lineItem, number }) => {
  const { variant } = lineItem
  const image = variant.images[0]
  return (
    <tr>
      <td>
        <div>
          {image && <img src={image.urls.small} alt={variant.name} />}
          <div>
            <h3>{variant.name}</h3>
            <p>{variant.description}</p>
          </div>
        </div>
      </td>
      <td>${lineItem.price}</td>
      <td>
        <input
          type="hidden"
          name={`order[line_items_attributes][${number}][id]`}
          value={lineItem.id} />
        <FormControl
          type="number"
          min="0"
          name={`order[line_items_attributes][${number}][quantity]`}
          defaultValue={lineItem.quantity} />
      </td>
      <td>
        ${lineItem.price}
      </td>
    </tr>
  )
}

LineItem.propTypes = {
  lineItem: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired
}

const CartBody = ({ lineItems }) => (
  <tbody>
    {lineItems.map((item, i) => <LineItem lineItem={item} number={i} />)}
  </tbody>
)

CartBody.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default CartBody
