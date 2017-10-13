import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { FormControl, Button } from "react-bootstrap"
import { Price } from "../../shared"

class LineItem extends Component {
  static propTypes = {
    lineItem: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state.quantity = props.lineItem.quantity
  }

  state = {
    quantity: 0
  }

  onChange = (e) => {
    this.setState({ quantity: parseInt(e.target.value, 10) })
  }

  onBlur = () => {
    const { onChange, lineItem: { id } } = this.props
    const { quantity } = this.state
    if(onChange) onChange(id, quantity)
  }

  onRemove = () => {
    const { onRemove, lineItem: { id } } = this.props
    if(onRemove) onRemove(id)
  }

  render() {
    const { lineItem, number } = this.props
    const { quantity } = this.state
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
            value={quantity}
            onChange={this.onChange}
            onBlur={this.onBlur} />
          <Button
            bsStyle="danger"
            onClick={this.onRemove}>
            <FormattedMessage {...messages.removeItem} />
          </Button>
        </td>
        <td><Price value={lineItem.total} /></td>
      </tr>
    )
  }
}

const CartBody = ({ lineItems, onChange, onRemove }) => (
  <tbody>
    {lineItems.map((item, i) => (
      <LineItem
        key={item.id}
        lineItem={item}
        number={i}
        onChange={onChange}
        onRemove={onRemove} />
    ))}
  </tbody>
)

CartBody.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

export default CartBody
