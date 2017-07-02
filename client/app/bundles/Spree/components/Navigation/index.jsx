import React from "react"
import PropTypes from "prop-types"
import { Menu } from "semantic-ui-react"
import Main from "./Main"
import User from "./User"
import SelectLanguage from "./SelectLanguage"

const Nav = ({ children }) => (
  <Menu>{children}</Menu>
)

Nav.propTypes = {
  children: PropTypes.node.isRequired
}

Nav.Main = Main
Nav.User = User
Nav.SelectLanguage = SelectLanguage

export default Nav
