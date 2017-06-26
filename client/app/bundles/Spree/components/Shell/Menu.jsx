import React from "react"
import PropTypes from "prop-types"
import { Menu } from "semantic-ui-react"
import { Taxonomy } from "../../lib/ApiClient/models"

const Nav = ({ taxonomies, ...props }) => (
  <Menu {...props}>
    <Menu.Item>Home</Menu.Item>
    {taxonomies.map(taxon => (
      <Menu.Item key={`taxonomy:${taxon.id}`}>
        {taxon.name}
      </Menu.Item>
    ))}
  </Menu>
)

Nav.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.instanceOf(Taxonomy))
}

export default Nav
