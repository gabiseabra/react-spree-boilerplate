import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Footer from "./Footer"

const App = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
