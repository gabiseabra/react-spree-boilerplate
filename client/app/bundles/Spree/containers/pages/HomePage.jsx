import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Shell, Pagination, withProvider } from "../app"
import { HomePage } from "../../components/pages"
import { getPageProducts, isPageLoaded } from "../../redux/selectors"
import { load } from "../../redux/modules/page"

const HomePageApp = ({ products, loading }) => (
  <Shell>
    <HomePage
      loading={loading}
      products={products}
      pagination={<Pagination />} />
  </Shell>
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
