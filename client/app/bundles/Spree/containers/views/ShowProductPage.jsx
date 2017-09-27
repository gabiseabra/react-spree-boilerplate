import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Breadcrumbs, withProvider } from "../app"
import { Options } from "../product"
import { ShowProductPage } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"

const ShowProductPageApp = ({ products, loading }) => (
  <ShowProductPage
    loading={loading}
    product={products && products[0]}
    options={products && <Options productId={products[0].id} />}
    breadcrumbs={products && products[0].taxonIds.map(id => (
      <Breadcrumbs key={id} taxonId={id} />
    ))} />
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
