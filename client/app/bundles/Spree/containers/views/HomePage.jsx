import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, withProvider } from "../app"
import { HomePage } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"
import { load } from "../../redux/modules/page"

const HomePageApp = ({ products, loading }) => (
  <HomePage>
    <HomePage.Title />
    <HomePage.Content loading={loading} products={products} />
    <Pagination />
  </HomePage>
)

HomePageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const props = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(props, { load })(HomePageApp))
