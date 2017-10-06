import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb } from "react-bootstrap"

const TaxonBreadcrumbs = ({ taxons }) => {
  const parents = taxons.slice(0, -1)
  const active = taxons[taxons.length - 1]
  return (
    <Breadcrumb>
      {parents.map(taxon => (
        <LinkContainer key={taxon.id} to={taxon.permalink}>
          <Breadcrumb.Item>{taxon.name}</Breadcrumb.Item>
        </LinkContainer>
      ))}
      <Breadcrumb.Item active>{active.name}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

TaxonBreadcrumbs.propTypes = {
  taxons: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaxonBreadcrumbs
