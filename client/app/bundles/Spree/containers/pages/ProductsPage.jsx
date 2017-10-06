import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination } from "../app"
import { Catalog } from "../product"
import { Page } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"

const ProductsPageApp = ({ products, loading }) => (
  <Page>
    <Page.Content loading={loading}>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ProductsPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const props = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default connect(props)(ProductsPageApp)
