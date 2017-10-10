import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import { FormattedMessage } from "react-intl"
import { spree as messages } from "app/locales/messages"
import { Catalog } from "../../product"
import { Page, Pagination, QuickSearch } from "../../page"
import { getPageProducts } from "../../../redux/selectors/page"

const ProductsPageApp = ({ products }) => (
  <Page>
    <Helmet title="Products" />
    <Page.Title>
      <FormattedMessage {...messages.products} />
    </Page.Title>
    <QuickSearch />
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ProductsPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state)
})

export default connect(props)(ProductsPageApp)
