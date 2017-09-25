import React from "react"
import PropTypes from "prop-types"
import { Breadcrumb } from "semantic-ui-react"

const navigateTo = taxon => () => {
  window.location.href = taxon.permalink
}

const TaxonBreadcrumbs = ({ taxons }) => {
  const parents = taxons.slice(0, -1)
  const active = taxons[taxons.length - 1]
  const sections = [
    ...parents.map(taxon => ({
      key: taxon.id,
      content: taxon.name,
      link: true,
      onClick: navigateTo(taxon)
    })),
    {
      key: active.id,
      content: active.name,
      active: true
    }
  ]
  return <Breadcrumb sections={sections} />
}

TaxonBreadcrumbs.propTypes = {
  taxons: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaxonBreadcrumbs
