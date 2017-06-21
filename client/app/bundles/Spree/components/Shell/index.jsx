import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Footer from "./Footer"
import LocaleProvider from "../../../../components/LocaleProvider"

const Shell = ({ children }) => (
  <LocaleProvider>
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </LocaleProvider>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired
}

export default Shell
