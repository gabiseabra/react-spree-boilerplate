import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { cart as messages } from "app/locales/messages"
import { Link } from "react-router-dom"
import {
  Table,
  Button,
  Alert,
  Grid,
  Col
} from "react-bootstrap"
import { Form } from "../../shared"
import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"
import styles from "./Cart.scss"

export default class Cart extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    coupon: PropTypes.node.isRequired,
    onClear: PropTypes.func
  }

  renderCart() {
    const { coupon, order, lineItems, onClear } = this.props
    return (
      <Form method="patch" action="/cart">
        <Table striped>
          <Header />
          <Body lineItems={lineItems} />
          <Footer order={order} onClear={onClear} />
        </Table>
        <Grid fluid>
          <Col sm={12} md={7}>{coupon}</Col>
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
