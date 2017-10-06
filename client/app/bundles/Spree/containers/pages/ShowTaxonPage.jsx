import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination, Breadcrumbs } from "../app"
import { Catalog } from "../product"
import { Page } from "../../components/views"
import {
  getPageProducts,
  getPageTaxons,
  isPageLoaded
} from "../../redux/selectors/page"

const ShowTaxonPageApp = ({ products, taxons, loading }) => (
  <Page>
    {taxons && taxons.map(({ id }) => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <Page.Content loading={loading}>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
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

export default connect(props)(ShowTaxonPageApp)
