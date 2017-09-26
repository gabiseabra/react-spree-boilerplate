import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import { Card } from "../../product"
import { Loader } from "../../shared"

const HomePage = ({ loading, products, pagination }) => (
  <div>
    <Loader loading={loading}>
      <Row>
        {products && products.map(p => (
          <Col xs={12} sm={6} md={3} key={p.id}>
            <Card product={p} />
          </Col>
        ))}
      </Row>
    </Loader>
    {pagination}
  </div>
)

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.node
}

export default HomePage
