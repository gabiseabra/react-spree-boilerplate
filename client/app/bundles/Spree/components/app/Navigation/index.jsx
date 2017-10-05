import React from "react"
import PropTypes from "prop-types"
import { Nav } from "react-bootstrap"
import Taxonomies from "./Taxonomies"

const Navigation = ({ taxonomies, user, cart, language }) => (
  <div>
    {taxonomies && <Taxonomies taxonomies={taxonomies} />}
    <Nav pullRight>
      {user}
      {language}
      {cart &&
      <ul className="nav navbar-nav">
        <li role="presentation">
          {cart}
        </li>
      </ul>}
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
