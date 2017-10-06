import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Navbar } from "react-bootstrap"
import { Logo } from "../../shared"

const Header = ({ children }) => (
  <Navbar collapseOnSelect>
    {children}
  </Navbar>
)

Header.Navigation = ({ children }) => (
  <Navbar.Collapse>
    {children}
  </Navbar.Collapse>
)

Header.Brand = () => (
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/"><Logo size="small" /></Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
)

Header.propTypes = {
  children: PropTypes.node
}

Header.Navigation.propTypes = {
  children: PropTypes.node
}

export default Header
