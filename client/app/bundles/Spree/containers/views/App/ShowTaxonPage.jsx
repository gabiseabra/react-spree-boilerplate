import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Breadcrumbs } from "../../app"
import { Catalog } from "../../product"
import { Page, Pagination, QuickSearch } from "../../page"
import { getPageProducts, getPageTaxons } from "../../../redux/selectors/page"

const ShowTaxonPageApp = ({ products, taxon }) => (
  <Page>
    {taxon && <Breadcrumbs taxonId={taxon.id} active />}
    <QuickSearch />
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ShowTaxonPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  taxon: PropTypes.object
}

const props = state => ({
  products: getPageProducts(state),
  taxon: (getPageTaxons(state) || [])[0]
})

export default connect(props)(ShowTaxonPageApp)
