import React from "react"
import PropTypes from "prop-types"
import { Nav } from "react-bootstrap"
import Taxonomies from "./Taxonomies"
import Language from "./Language"

const Navigation = ({ children, controls }) => (
  <div>
    <Nav>
      {children}
    </Nav>
    <Nav pullRight>
      {controls}
    </Nav>
  </div>
)

Navigation.propTypes = {
  controls: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}

Navigation.Taxonomies = Taxonomies
Navigation.Language = Language

export default Navigation
