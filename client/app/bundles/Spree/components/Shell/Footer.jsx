import React from "react"
import { Layout } from "antd"

const Footer = () => (
  <Layout.Footer>
    <div>
      &copy; {(new Date()).getFullYear()} Gabriela Seabra
    </div>
  </Layout.Footer>
)

export default Footer
