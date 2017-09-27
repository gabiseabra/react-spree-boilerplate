import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Breadcrumbs, withProvider } from "../app"
import { Options } from "../product"
import { ShowProductPage } from "../../components/views"
import { getPageProducts, isPageLoaded } from "../../redux/selectors/page"

const ShowProductPageApp = ({ product, loading }) => (
  <ShowProductPage>
    <ShowProductPage.Title product={product} />
    {product && product.taxonIds.map(id => (
      <Breadcrumbs key={id} taxonId={id} />
    ))}
    <ShowProductPage.Content
      loading={loading}
      product={product}
      options={product && <Options productId={product.id} />} />
  </ShowProductPage>
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
