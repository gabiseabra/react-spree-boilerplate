import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import { Card } from "../../product"
import { Loader } from "../../shared"

const HomePage = ({ children }) => (
  <div>
    {children}
  </div>
)

HomePage.Title = () => (<h2>Home</h2>)

HomePage.Content = ({ loading, products }) => (
  <Loader loading={loading}>
    <Row>
      {products && products.map(p => (
        <Col xs={12} sm={6} md={3} key={p.id}>
          <Card product={p} />
        </Col>
      ))}
    </Row>
  </Loader>
)

HomePage.propTypes = {
  children: PropTypes.node
}

HomePage.Content.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object)
}

export default HomePage
