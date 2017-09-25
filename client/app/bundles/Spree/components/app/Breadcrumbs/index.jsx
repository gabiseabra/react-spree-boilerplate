import React from "react"
import PropTypes from "prop-types"
import { Breadcrumb } from "semantic-ui-react"

const TaxonBreadcrumbs = ({ taxons, ...props }) => {
  const parents = taxons.slice(0, -1)
  const active = taxons[taxons.length - 1]
  const sections = [
    ...parents.map(t => ({
      key: t.id,
      content: (<a href={t.permalink}>{t.name}</a>),
      link: true
    })),
    {
      key: active.id,
      content: active.name,
      active: true
    }
  ]
  return <Breadcrumb {...props} sections={sections} />
}

TaxonBreadcrumbs.propTypes = {
  taxons: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaxonBreadcrumbs
