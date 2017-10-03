import React from "react"
import PropTypes from "prop-types"
import { Grid, Col } from "react-bootstrap"
import Card from "../Card"
import styles from "./Catalog.scss"

const Catalog = ({ products }) => (
  <Grid className={styles.Catalog} fluid>
    {products.map(p => (
      <Col xs={12} sm={6} md={4} key={p.id}>
        <Card product={p} />
      </Col>
    ))}
  </Grid>
)

Catalog.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Catalog
