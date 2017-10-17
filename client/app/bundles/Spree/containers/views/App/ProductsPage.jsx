import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import { injectIntl, intlShape } from "react-intl"
import { spree as messages } from "app/locales/messages"
import { Catalog } from "../../product"
import { Page, Pagination, QuickSearch } from "../../page"
import { getPageProducts } from "../../../redux/selectors/page"

const ProductsPageApp = ({ intl, products }) => (
  <Page load>
    <Helmet title={intl.formatMessage(messages.products)} />
    <Page.Title>{intl.formatMessage(messages.products)}</Page.Title>
    <QuickSearch />
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ProductsPageApp.propTypes = {
  intl: intlShape,
  products: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state)
})

export default connect(props)(injectIntl(ProductsPageApp))
