import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, withProvider } from "../app"
import { HomePage } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors"
import { load } from "../../redux/modules/page"

const HomePageApp = ({ products, loading }) => (
  <HomePage
    loading={loading}
    products={products}
    pagination={<Pagination />} />
)

HomePageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const mapper = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(mapper, { load })(HomePageApp))
