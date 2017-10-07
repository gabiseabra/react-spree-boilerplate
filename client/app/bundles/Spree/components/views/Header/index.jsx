import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Navbar } from "react-bootstrap"
import { Logo } from "../../shared"

const Header = ({ children }) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><Logo size="small" /></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {children}
    </Navbar.Collapse>
  </Navbar>
)

Header.propTypes = {
  children: PropTypes.node
}

export default Header
