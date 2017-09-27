import React from "react"
import PropTypes from "prop-types"
import { Info } from "../../product"
import { Loader } from "../../shared"

const ShowProductPage = ({ loading, product, breadcrumbs, options }) => (
  <div>
    {breadcrumbs}
    <Loader loading={loading}>
      {product && <Info product={product} options={options} />}
    </Loader>
  </div>
)

ShowProductPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  breadcrumbs: PropTypes.node,
  options: PropTypes.node
}

export default ShowProductPage
