import React from "react"
import PropTypes from "prop-types"
import { Nav } from "react-bootstrap"
import Taxonomies from "./Taxonomies"
import Language from "./Language"
import Cart from "./Cart"

const Navigation = ({ children, right }) => (
  <div>
    <Nav>
      {children}
    </Nav>
    <Nav pullRight>
      {right}
    </Nav>
  </div>
)

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired
}

Navigation.Taxonomies = Taxonomies
Navigation.Language = Language
Navigation.Cart = Cart

export default Navigation
