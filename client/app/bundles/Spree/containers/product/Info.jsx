import React, { Component } from "react"
import PropTypes from "prop-types"
import Options from "./Options"
import { Info } from "../../components/product"

export default class ProductInfoApp extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  state = {
    variant: undefined
  }

  onChange = variant => this.setState({ variant })

  render() {
    const { product } = this.props
    const { variant } = this.state
    return (
      <Info
        product={product}
        variant={variant || product.master}
        options={<Options product={product} onChange={this.onChange} />} />
    )
  }
}
