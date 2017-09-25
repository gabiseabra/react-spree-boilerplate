import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, Breadcrumbs, withProvider } from "../app"
import { ProductsPage } from "../../components/views"
import { getPageProducts, getPageTaxons, isPageLoaded } from "../../redux/selectors"

const ShowTaxonPageApp = ({ products, taxons, loading }) => (
  <ProductsPage
    loading={loading}
    products={products}
    breadcrumbs={taxons && taxons.map(({ id }) => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    pagination={<Pagination />} />
)

ShowTaxonPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  loading: PropTypes.bool.isRequired
}

const mapper = state => ({
  products: getPageProducts(state),
  taxons: getPageTaxons(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(mapper)(ShowTaxonPageApp))
