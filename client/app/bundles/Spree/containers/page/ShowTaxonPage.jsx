import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Breadcrumbs } from "../app"
import { Catalog } from "../product"
import { getPageProducts, getPageTaxons } from "../../redux/selectors/page"
import Page from "./Page"
import Pagination from "./Pagination"

const ShowTaxonPageApp = ({ products, taxons }) => (
  <Page>
    {taxons && taxons.map(({ id }) => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ShowTaxonPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  taxons: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state),
  taxons: getPageTaxons(state)
})

export default connect(props)(ShowTaxonPageApp)
