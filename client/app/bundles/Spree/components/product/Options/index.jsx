import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormControl, Button } from "react-bootstrap"
import Variants from "./Variants"

export default class ProductOptions extends Component {
  static propTypes = {
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
    const { variant, quantity } = this.state
    if(onSelect && quantity) onSelect(variant, quantity)
  }

  get completed() {
    return (this.props.product.hasVariants && this.state.completed)
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
    const { variant, completed } = this
    if(!completed) return "Please select a product"
    if(!variant) return "Product unavailable"
    if(!variant.inStock) return "Out of stock"
    return "In stock"
  }

  render() {
    const { optionTypes, variants, product } = this.props
    return (
      <div>
        {product.hasVariants &&
        <Variants
          variants={variants}
          optionTypes={optionTypes}
          onChange={this.onChangeVariant} />}
        <div>
          <p>{this.statusText}</p>
          <FormControl
            type="number"
            min="1"
            value={this.state.quantity}
            onChange={this.onChangeQuantity} />
          <Button disabled={!this.status} onClick={this.onSelect}>
            Add to cart
          </Button>
        </div>
      </div>
    )
  }
}
