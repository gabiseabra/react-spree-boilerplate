import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Catalog } from "../product"
import { getPageProducts } from "../../redux/selectors/page"
import { load } from "../../redux/modules/page"
import Page from "./Page"
import Pagination from "./Pagination"

const HomePageApp = ({ products }) => (
  <Page>
    <Page.Content>
      {products && <Catalog products={products} />}
    </Page.Content>
    <Pagination />
  </Page>
)

HomePageApp.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  products: getPageProducts(state)
})

export default connect(props, { load })(HomePageApp)
