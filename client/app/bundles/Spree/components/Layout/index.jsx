import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Footer from "./Footer"
import LocaleProvider from "../../../../components/LocaleProvider"

const App = ({ children }) => (
  <LocaleProvider>
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </LocaleProvider>
)

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
