import React from "react"
import { Helmet } from "react-helmet"
import { injectIntl, intlShape } from "react-intl"
import { spree as messages } from "app/locales/messages"
import { Cart } from "../../cart"
import { Page } from "../../page"

const CartPageApp = ({ intl }) => (
  <Page>
    <Helmet title={intl.formatMessage(messages.cart)} />
    <Page.Title>{intl.formatMessage(messages.cart)}</Page.Title>
    <Page.Content>
      <Cart />
    </Page.Content>
  </Page>
)

CartPageApp.propTypes = {
  intl: intlShape
}

export default injectIntl(CartPageApp)
