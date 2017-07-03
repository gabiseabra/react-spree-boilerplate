import React from "react"
import { Segment } from "semantic-ui-react"

const Footer = () => (
  <Segment as="footer" basic>
    &copy; {(new Date()).getFullYear()} Gabriela Seabra
  </Segment>
)

export default Footer
