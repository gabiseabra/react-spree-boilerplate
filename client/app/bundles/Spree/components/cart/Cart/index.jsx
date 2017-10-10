import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Link } from "react-router-dom"
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Table,
  Button,
  Alert,
  Grid,
  Col
} from "react-bootstrap"
import { Form } from "../../shared"
import LineItem from "./LineItem"
import styles from "./Cart.scss"

export default class Cart extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClear: PropTypes.func
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th><FormattedMessage {...messages.item} /></th>
          <th><FormattedMessage {...messages.price} /></th>
          <th><FormattedMessage {...messages.quantity} /></th>
          <th><FormattedMessage {...messages.total} /></th>
        </tr>
      </thead>
    )
  }

  renderFooter() {
    const { order, onClear } = this.props
    const { total, adjustment } = order.price
    return (
      <tfoot>
        {adjustment === 0 ? undefined :
        <tr>
          <td colSpan={3}>
            <FormattedMessage {...messages.adjustment} />
          </td>
          <td>${adjustment}</td>
        </tr>}
        <tr>
          <td colSpan={3}>
            <Button onClick={onClear}>
              <FormattedMessage {...messages.emptyCart} />
            </Button>
            <Link to="/products">
              <FormattedMessage {...messages.continueShopping} />
            </Link>
          </td>
          <td>${total}</td>
        </tr>
      </tfoot>
    )
  }

  renderItems() {
    const { lineItems } = this.props
    return (
      <tbody>
        {lineItems.map((item, i) => (
          <LineItem
            key={item.id}
            lineItem={item}
            number={i} />
        ))}
      </tbody>
    )
  }

  renderCart() {
    return (
      <Form method="patch" action="/cart">
        <Table striped>
          {this.renderHeader()}
          {this.renderItems()}
          {this.renderFooter()}
        </Table>
        <Grid fluid>
          <Col sm={12} md={7} className={styles.coupon}>
            <FormGroup>
              <ControlLabel>
                <FormattedMessage {...messages.coupon} />
              </ControlLabel>
              <FormControl
                type="string"
                name="order[coupon_code]" />
            </FormGroup>
            <Button type="submit" name="button">
              <FormattedMessage {...messages.applyCoupon} />
            </Button>
          </Col>
          <Col sm={12} md={5} className={styles.checkout}>
            <Button type="submit" name="button">
              <FormattedMessage {...messages.update} />
            </Button>
            <Button bsStyle="primary" bsSize="large" type="submit" name="checkout">
              <FormattedMessage {...messages.proceedCheckout} />
            </Button>
          </Col>
        </Grid>
      </Form>
    )
  }

  renderEmptyCart() {
    return (
      <div>
        <Alert bsStyle="info">
          <FormattedMessage {...messages.cartIsEmpty} />
        </Alert>
        <Link to="/products">
          <Button>
            <FormattedMessage {...messages.continueShopping} />
          </Button>
        </Link>
      </div>
    )
  }

  render() {
    const { order } = this.props
    return (order.quantity ? this.renderCart() : this.renderEmptyCart())
  }
}
