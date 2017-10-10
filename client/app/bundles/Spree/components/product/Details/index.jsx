import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import { product as messages } from "app/locales/messages"
import Properties from "./Properties"

const Details = ({ product }) => (
  <Tabs defaultActiveKey={1} id={`Product-Details-${product.id}`}>
    <Tab eventKey={1} title={<FormattedMessage {...messages.description} />}>
      <span itemProp="description">{product.description}</span>
    </Tab>
    <Tab eventKey={2} title={<FormattedMessage {...messages.properties} />}>
      <Properties product={product} />
    </Tab>
  </Tabs>
)

export default Details
