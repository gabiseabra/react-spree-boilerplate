import React from "react"
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

export default CartPageApp
