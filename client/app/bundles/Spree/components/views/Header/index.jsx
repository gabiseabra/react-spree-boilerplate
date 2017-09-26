import React from "react"
import PropTypes from "prop-types"
import { Navbar } from "react-bootstrap"
import { Logo } from "../../shared"

const Header = ({ navigation }) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><Logo size="small" /></a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      {navigation}
    </Navbar.Collapse>
  </Navbar>
)

Header.propTypes = {
  navigation: PropTypes.node.isRequired
}

export default Header
