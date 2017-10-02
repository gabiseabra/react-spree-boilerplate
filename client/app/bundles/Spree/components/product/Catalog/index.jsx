import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import Card from "../Card"

const Catalog = ({ products }) => (
  <Row>
    {products.map(p => (
      <Col xs={12} sm={6} md={3} key={p.id}>
        <Card product={p} />
      </Col>
    ))}
  </Row>
)

Catalog.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Catalog
