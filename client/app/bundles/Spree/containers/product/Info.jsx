import React, { Component } from "react"
import PropTypes from "prop-types"
import Options from "./Options"
import { Info } from "../../components/product"

export default class ProductInfoApp extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  render() {
    const { product } = this.props
    return (
      <Info
        product={product}
        variant={product.master}
        options={<Options productId={product.id} />} />
    )
  }
}
