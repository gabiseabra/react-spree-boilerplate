import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { Breadcrumbs } from "../../app"
import { Info } from "../../product"
import { Page } from "../../page"
import { getPageProducts } from "../../../redux/selectors/page"

const ShowProductPageApp = ({ product }) => (
  <Page>
    {product && <Helmet title={product.name} meta={product.meta} />}
    {product && product.taxonIds.map(id => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <Page.Content>
      {product && <Info product={product} />}
    </Page.Content>
  </Page>
)

ShowProductPageApp.propTypes = {
  product: PropTypes.object
}

const props = state => ({
  product: (getPageProducts(state) || [])[0]
})

export default connect(props)(ShowProductPageApp)
