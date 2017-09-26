import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import { Card } from "../../product"
import { Loader } from "../../shared"

const ProductsPage = ({ loading, products, breadcrumbs, pagination }) => (
  <div>
    {breadcrumbs}
    <Loader loading={loading}>
      <Row>
        {products && products.map(p => (
          <Col xs={6} md={3} key={p.id}>
            <Card product={p} />
          </Col>
        ))}
      </Row>
    </Loader>
    {pagination}
  </div>
)

ProductsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  breadcrumbs: PropTypes.node,
  pagination: PropTypes.node
}

export default ProductsPage
