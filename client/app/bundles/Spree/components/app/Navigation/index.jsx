import React from "react"
import PropTypes from "prop-types"
import { Nav } from "react-bootstrap"
import Taxonomies from "./Taxonomies"

const NavItem = ({ children }) => (<li role="presentation">{children}</li>)

const Navigation = ({ taxonomies, user, cart, language }) => (
  <div>
    {taxonomies && <Taxonomies taxonomies={taxonomies} />}
    <Nav pullRight>
      {user}
      {language}
      {cart &&
      <NavItem>
        {cart}
      </NavItem>}
    </Nav>
  </div>
)

Navigation.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.node,
  cart: PropTypes.node,
  language: PropTypes.node
}

export default Navigation
