import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import Card from "../Card"
import styles from "./Catalog.css"

const Catalog = ({ products }) => (
  <Row className={styles.Catalog}>
    {products.map(p => (
      <Col xs={12} sm={6} md={4} key={p.id}>
        <Card product={p} />
      </Col>
    ))}
  </Row>
)

Catalog.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Catalog
