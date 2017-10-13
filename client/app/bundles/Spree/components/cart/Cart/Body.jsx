import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { FormControl, Button } from "react-bootstrap"
import { Price } from "../../shared"

const LineItem = ({ lineItem, number, onRemove }) => {
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
      <td><Price value={lineItem.price} /></td>
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
        <Button
          bsStyle="danger"
          onClick={() => onRemove(lineItem.id)}>
          <FormattedMessage {...messages.removeItem} />
        </Button>
      </td>
      <td><Price value={lineItem.price} /></td>
    </tr>
  )
}

LineItem.propTypes = {
  lineItem: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired
}

const CartBody = ({ lineItems, onRemove }) => (
  <tbody>
    {lineItems.map((item, i) => (
      <LineItem
        key={item.id}
        lineItem={item}
        number={i}
        onRemove={onRemove} />
    ))}
  </tbody>
)

CartBody.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired
}

export default CartBody
