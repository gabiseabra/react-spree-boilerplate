import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { Cart } from "../../cart"
import { Page } from "../../page"

const CartPageApp = () => (
  <Page>
    <Helmet title="Cart" />
    <Page.Title>Cart</Page.Title>
    <Page.Content>
      <Cart />
    </Page.Content>
  </Page>
)

CartPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default CartPageApp
