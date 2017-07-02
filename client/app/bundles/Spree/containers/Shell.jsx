import React from "react"
import PropTypes from "prop-types"
import { Shell } from "../components"
import Navigation from "./Navigation"

const ShellApp = ({ children }) => (
  <Shell navigation={<Navigation />}>
    {children}
  </Shell>
)

ShellApp.propTypes = {
  children: PropTypes.node.isRequired
}

export default ShellApp
