import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb } from "react-bootstrap"

const TaxonBreadcrumbs = ({ taxons, active: isActive }) => {
  const parents = taxons.slice(0, -1)
  const active = taxons[taxons.length - 1]
  return (
    <Breadcrumb>
      {parents.map(taxon => (
        <LinkContainer key={taxon.id} to={taxon.permalink}>
          <Breadcrumb.Item>{taxon.name}</Breadcrumb.Item>
        </LinkContainer>
      ))}
      <LinkContainer to={active.permalink}>
        <Breadcrumb.Item active={isActive}>{active.name}</Breadcrumb.Item>
      </LinkContainer>
    </Breadcrumb>
  )
}

TaxonBreadcrumbs.propTypes = {
  taxons: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.bool.isRequired
}

TaxonBreadcrumbs.defaultProps = {
  active: false
}

export default TaxonBreadcrumbs
