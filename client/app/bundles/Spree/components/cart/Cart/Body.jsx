import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { injectIntl, intlShape } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { FormControl, Button } from "react-bootstrap"
import { Price } from "../../shared"
import styles from "./Body.scss"

class BaseLineItem extends Component {
  static propTypes = {
    intl: intlShape,
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
    const { lineItem, number, intl } = this.props
    const { quantity } = this.state
    const { variant } = lineItem
    const image = variant.images[0]
    return (
      <tr>
        <td>
          <div>
            {image && <img src={image.urls.small} alt={variant.name} />}
            <div>
              <Link to={variant.permalink}>
                <h3>{variant.name}</h3>
              </Link>
              <p>{variant.description}</p>
            </div>
          </div>
        </td>
        <td><Price value={lineItem.price} /></td>
        <td className={styles.controls}>
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
            className={styles.removeButton}
            onClick={this.onRemove}
            title={intl.formatMessage(messages.removeItem)} />
        </td>
        <td><Price value={lineItem.total} /></td>
      </tr>
    )
  }
}

const LineItem = injectIntl(BaseLineItem)

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
