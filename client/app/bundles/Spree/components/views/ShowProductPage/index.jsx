import React from "react"
import PropTypes from "prop-types"
import { Info } from "../../product"
import { Loader } from "../../shared"

const ShowProductPage = ({ children }) => (
  <div>
    {children}
  </div>
)

ShowProductPage.Title = ({ product }) => (<h2>{product.name}</h2>)

ShowProductPage.Content = ({ loading, product, options }) => (
  <Loader loading={loading}>
    {product && <Info product={product} variant={product.master} options={options} />}
  </Loader>
)

ShowProductPage.propTypes = {
  children: PropTypes.node
}

ShowProductPage.Content.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  options: PropTypes.node
}

export default ShowProductPage
