import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, FormControl, Button } from "react-bootstrap"
import Slideshow from "../Slideshow"
import Price from "../Price"
import Details from "../Details"
import styles from "./Info.css"

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
      <Row>
        <Col xs={12} sm={6} md={4}>
          <Slideshow variant={variant} />
        </Col>
        <Col xs={12} sm={6} md={8} className={styles.details}>
          <header>
            <h2>{product.name}</h2>
            <Price className={styles.price} product={variant} />
          </header>
          <div className={styles.cart}>
            {options}
          </div>
          <Details product={product} />
        </Col>
      </Row>
    )
  }
}
