import React, { Component } from "react"
import { connect } from "react-redux"
import { Options } from "../../components/product"
import { getProductVariants, getOptionTypes } from "../../redux/selectors/products"
import { add } from "../../redux/modules/cart"

class OptionsApp extends Component {
  onSelect = (variant, quantity) => this.props.add(variant.id, quantity)

  render() {
    return (
      <Options {...this.props} onSelect={this.onSelect} />
    )
  }
}

const props = (state, { product }) => ({
  optionTypes: getOptionTypes(state, { id: product.id }),
  variants: getProductVariants(state, { id: product.id })
})

export default connect(props, { add })(OptionsApp)
