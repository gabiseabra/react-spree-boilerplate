import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormControl, Button } from "react-bootstrap"
import { injectIntl, intlShape } from "react-intl"
import { product as messages } from "app/locales/messages"
import Variants from "./Variants"
import styles from "./Options.scss"

class ProductOptions extends Component {
  static propTypes = {
    intl: intlShape,
    optionTypes: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    variants: PropTypes.objectOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    onSelect: PropTypes.func
  }

  state = {
    completed: false,
    variant: undefined,
    quantity: 1
  }

  componentWillReceiveProps({ product }) {
    if(!product.hasVariants) {
      this.setState({
        completed: true,
        variant: product.master
      })
    }
  }

  onChangeQuantity = (e) => {
    this.setState({ quantity: e.target.value })
  }

  onChangeVariant = (variant, completed) => {
    const { onChange } = this.props
    this.setState({ variant, completed })
    if(onChange) onChange(variant, completed)
  }

  onSelect = () => {
    const { onSelect } = this.props
    const { quantity } = this.state
    if(onSelect && quantity) onSelect(this.variant, quantity)
  }

  get completed() {
    return (!this.props.product.hasVariants || this.state.completed)
  }

  get variant() {
    const { product } = this.props
    const { variant } = this.state
    return (product.hasVariants ? variant : product.master)
  }

  get status() {
    const variant = this.variant
    return variant && variant.inStock
  }

  get statusText() {
    const { intl } = this.props
    const { variant, completed } = this
    if(!completed) return intl.formatMessage(messages.invalidVariant)
    if(!variant) return intl.formatMessage(messages.unavailableVariant)
    if(!variant.inStock) return intl.formatMessage(messages.outOfStock)
    return intl.formatMessage(messages.inStock)
  }

  render() {
    const { intl, optionTypes, variants, product } = this.props
    return (
      <div>
        {product.hasVariants &&
        <Variants
          variants={variants}
          optionTypes={optionTypes}
          onChange={this.onChangeVariant} />}
        <div className={styles.form}>
          <p>
            {this.statusText}
          </p>
          <FormControl
            type="number"
            min="1"
            value={this.state.quantity}
            onChange={this.onChangeQuantity} />
          <Button disabled={!this.status} onClick={this.onSelect}>
            {intl.formatMessage(messages.addToCart)}
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductOptions)
