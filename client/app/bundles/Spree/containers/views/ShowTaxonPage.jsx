import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, Breadcrumbs, withProvider } from "../app"
import { ProductsPage } from "../../components/views"
import {
  getPageProducts,
  getPageTaxons,
  isPageLoaded
} from "../../redux/selectors/page"

const ShowTaxonPageApp = ({ products, taxons, loading }) => (
  <ProductsPage>
    {taxons && taxons.map(({ id }) => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <ProductsPage.Content loading={loading} products={products} />
    <Pagination />
  </ProductsPage>
)

ShowTaxonPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  taxons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
}

const props = state => ({
  products: getPageProducts(state),
  taxons: getPageTaxons(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(props)(ShowTaxonPageApp))
