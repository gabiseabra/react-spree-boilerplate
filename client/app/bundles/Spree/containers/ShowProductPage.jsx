import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withProvider } from "./Provider"
import Shell from "./Shell"
import { ShowProductPage } from "../components"
import { getPageProducts, isPageLoaded } from "../redux/selectors"

const ShowProductPageApp = ({ products, loading }) => (
  <Shell>
    <ShowProductPage
      loading={loading}
      product={products && products[0]} />
  </Shell>
)

ShowProductPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const mapper = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(mapper)(ShowProductPageApp))
