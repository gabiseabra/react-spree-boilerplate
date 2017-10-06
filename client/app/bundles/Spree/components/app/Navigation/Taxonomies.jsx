import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap"

const Taxonomy = ({ taxonomy }) => (
  taxonomy.taxons.length ? (
    <NavDropdown id={`Nav-Taxonomies-t${taxonomy.id}`} title={taxonomy.name}>
      <LinkContainer to={taxonomy.permalink}>
        <MenuItem>{taxonomy.name}</MenuItem>
      </LinkContainer>
      <MenuItem divider />
      {taxonomy.taxons.map(taxon => (
        <LinkContainer key={taxon.id} to={taxonomy.permalink}>
          <MenuItem>{taxon.name}</MenuItem>
        </LinkContainer>
      ))}
    </NavDropdown>
  ) : (
    <LinkContainer to={taxonomy.permalink}>
      <NavItem>{taxonomy.name}</NavItem>
    </LinkContainer>
  )
)

Taxonomy.propTypes = {
  taxonomy: PropTypes.object.isRequired
}

const TaxonomiesNav = ({ taxonomies }) => (
  <Nav>
    {taxonomies.map(taxon => <Taxonomy key={taxon.id} taxonomy={taxon} />)}
  </Nav>
)

TaxonomiesNav.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaxonomiesNav
