import React from "react"
import PropTypes from "prop-types"
import { Navbar } from "react-bootstrap"
import { Logo } from "../../shared"
import Navigation from "./Navigation"

const Header = ({ taxonomies, userNav }) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><Logo size="small" /></a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      {taxonomies && <Navigation taxonomies={taxonomies} />}
      {userNav && React.cloneElement(userNav, { pullRight: true })}
    </Navbar.Collapse>
  </Navbar>
)

Header.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object),
  // selectLanguage: PropTypes.node,
  userNav: PropTypes.node
}

export default Header
