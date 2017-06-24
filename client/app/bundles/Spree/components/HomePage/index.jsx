import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "antd"
import Product from "../Product"

const HomePage = ({ products, pagination }) => (
  <div>
    <Row gutter={16}>
      {products.map(p => (
        <Col key={p.id} md={6} sm={8} xs={24}>
          <Product key={p.id} product={p} />
        </Col>
      ))}
    </Row>
    {pagination}
  </div>
)

HomePage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.node
}

export default HomePage
