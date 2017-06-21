import React from "react"
import PropTypes from "prop-types"
import Product from "../Product"
import Pagination from "../Pagination"

const HomePage = ({ products, pagination }) => (
  <div>
    <div>
      {products.map(p => <Product key={p.id} product={p} />)}
    </div>
    {pagination && <Pagination pagination={pagination} />}
  </div>
)

HomePage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.object.isRequired
}

export default HomePage
