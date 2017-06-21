import React from "react"
import PropTypes from "prop-types"
import { Layout } from "antd"
import Header from "./Header"
import Footer from "./Footer"
import LocaleProvider from "../../../../components/LocaleProvider"

const Shell = ({ children }) => (
  <LocaleProvider>
    <Layout>
      <Header />
      <Layout.Content>
        {children}
      </Layout.Content>
      <Footer />
    </Layout>
  </LocaleProvider>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired
}

export default Shell
