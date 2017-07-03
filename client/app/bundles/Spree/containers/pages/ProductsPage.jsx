import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Shell, Pagination, withProvider } from "../app"
import { ProductsPage } from "../../components/pages"
import { getPageProducts, isPageLoaded } from "../../redux/selectors"

const ProductsPageApp = ({ products, loading }) => (
  <Shell>
    <ProductsPage
      loading={loading}
      products={products}
      pagination={<Pagination />} />
  </Shell>
)

ProductsPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const mapper = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(mapper)(ProductsPageApp))
