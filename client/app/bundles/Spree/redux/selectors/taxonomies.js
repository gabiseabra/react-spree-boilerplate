import { createSelector } from "reselect"

const flatten = taxon => taxon.taxons.reduce((array, child) => (
  array.concat(flatten(child))
), [ taxon ])


export const getAllTaxonomies = state => state.taxonomies

export const getTaxonomy = createSelector(
  getAllTaxonomies,
  (state, { id }) => id,
  (taxonomies, id) => taxonomies.find(taxon => taxon.taxonomyId === id)
)

export const getAllTaxons = createSelector(
  getAllTaxonomies,
  (taxonomies) => {
    const taxonsArray = taxonomies.reduce((arr, taxon) => arr.concat(flatten(taxon)), [])
    const map = {}
    taxonsArray.forEach((taxon) => {
      map[taxon.id] = taxon
    })
    return map
  }
)

/*
export const getTaxon = createSelector(
  getAllTaxons,
  (state, { id }) => id,
  (taxons, id) => taxons[id]
)
*/

export const getBreadcrumb = createSelector(
  getAllTaxons,
  (_, { id }) => id,
  // eslint-disable-next-line prefer-arrow-callback
  function breadcrumb(taxons, id) {
    let taxon = taxons[id]
    const result = [ taxon ]
    while(taxon.parentId) {
      taxon = taxons[taxon.parentId]
      result.unshift(taxon)
    }
    return result
  }
)
