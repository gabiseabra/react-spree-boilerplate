import React, { Component } from "react"
import PropTypes from "prop-types"
import { Grid, Col } from "react-bootstrap"
import { Price } from "../../shared"
import Slideshow from "../Slideshow"
import Details from "../Details"

export default class ProductInfo extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    onSelect: PropTypes.func
  }

  state = {
    quantity: 1
  }

  onChange = e => this.setState({ quantity: e.target.value })

  onSelect = () => {
    this.props.onSelect(this.state.quantity)
  }

  get isDisabled() {
    return !this.props.variant.inStock
  }

  render() {
    const { product, variant, options } = this.props
    return (
      <Grid fluid itemScope itemType="http://schema.org/Product">
        <Col xs={12} sm={6}>
          <Slideshow product={product} variant={variant} />
        </Col>
        <Col xs={12} sm={6}>
          <header>
            <h2 itemProp="name">{product.name}</h2>
            <span itemScope itemProp="offers">
              <Price itemProp="price" value={variant.price} />
            </span>
          </header>
          <div>
            {options}
          </div>
          <Details product={product} />
        </Col>
      </Grid>
    )
  }
}
