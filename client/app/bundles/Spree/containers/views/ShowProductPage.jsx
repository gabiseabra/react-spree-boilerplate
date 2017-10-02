import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Breadcrumbs, withProvider } from "../app"
import { Info } from "../product"
import { Page } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"

const ShowProductPageApp = ({ product, loading }) => (
  <Page>
    {product && product.taxonIds.map(id => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <Page.Content loading={loading}>
      {product && <Info product={product} />}
    </Page.Content>
  </Page>
)

ShowProductPageApp.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool.isRequired
}

const props = state => ({
  product: (getPageProducts(state) || [])[0],
  loading: !isPageLoaded(state)
})

export default withProvider(connect(props)(ShowProductPageApp))
