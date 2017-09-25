import React from "react"
import PropTypes from "prop-types"
import { Info } from "../../product"
import Loader from "../Loader"

const ShowProductPage = ({ loading, product, breadcrumbs }) => (
  <div>
    {breadcrumbs}
    <Loader loading={loading}>
      {product && <Info product={product} />}
    </Loader>
  </div>
)

ShowProductPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  breadcrumbs: PropTypes.node
}

export default ShowProductPage
