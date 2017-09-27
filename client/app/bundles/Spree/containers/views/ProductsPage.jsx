import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, withProvider } from "../app"
import { ProductsPage } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"

const ProductsPageApp = ({ products, loading }) => (
  <ProductsPage>
    <ProductsPage.Title />
    <ProductsPage.Content loading={loading} products={products} />
    <Pagination />
  </ProductsPage>
)

ProductsPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const props = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(props)(ProductsPageApp))
