import React from "react"
import PropTypes from "prop-types"
import { Menu } from "semantic-ui-react"

const MainNav = ({ taxonomies }) => (
  <Menu.Menu>
    <Menu.Item>Home</Menu.Item>
    {taxonomies.map(taxon => (
      <Menu.Item key={`taxonomy:${taxon.id}`}>
        {taxon.name}
      </Menu.Item>
    ))}
  </Menu.Menu>
)

MainNav.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

export default MainNav
