import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Catalog } from "../product"
import { getPageProducts } from "../../redux/selectors/page"
import Page from "./Page"
import Pagination from "./Pagination"
import QuickSearch from "./QuickSearch"

const ProductsPageApp = ({ products }) => (
  <Page>
    <QuickSearch />
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

ProductsPageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state)
})

export default connect(props)(ProductsPageApp)
