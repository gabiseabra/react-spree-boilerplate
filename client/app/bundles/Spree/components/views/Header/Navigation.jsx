import React from "react"
import PropTypes from "prop-types"
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap"

const Taxonomy = ({ taxonomy }) => (
  taxonomy.taxons.length ? (
    <NavDropdown id={`Header-Nav-t${taxonomy.id}`} title={taxonomy.name}>
      <MenuItem href={taxonomy.permalink}>{taxonomy.name}</MenuItem>
      <MenuItem divider />
      {taxonomy.taxons.map(taxon => (
        <MenuItem key={taxon.id} href={taxon.permalink}>{taxon.name}</MenuItem>
      ))}
    </NavDropdown>
  ) : (
    <NavItem href={taxonomy.permalink}>{taxonomy.name}</NavItem>
  )
)

Taxonomy.propTypes = {
  taxonomy: PropTypes.object.isRequired
}

const Navigation = ({ taxonomies }) => (
  <Nav>
    {taxonomies.map(taxon => <Taxonomy key={taxon.id} taxonomy={taxon} />)}
  </Nav>
)

Navigation.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

export default Navigation
