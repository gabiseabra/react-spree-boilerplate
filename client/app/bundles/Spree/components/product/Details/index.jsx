import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import Properties from "./Properties"

const Details = ({ product }) => (
  <Tabs defaultActiveKey={1} id={`Product-Details-${product.id}`}>
    <Tab eventKey={1} title="Description">
      {product.description}
    </Tab>
    <Tab eventKey={2} title="Properties">
      <Properties product={product} />
    </Tab>
  </Tabs>
)

export default Details
