import React from "react"
import PropTypes from "prop-types"
import Loader from "../Loader"
import { Info } from "../Product"

const ShowProductPage = ({ loading, product }) => (
  <Loader loading={loading}>
    {product && <Info product={product} />}
  </Loader>
)

ShowProductPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object
}

export default ShowProductPage
