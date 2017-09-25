import { createSelector } from "reselect"

// taxonomies
export const getAllTaxonomies = state => state.taxonomies.tree

export const getTaxonomiesError = state => state.taxonomies.error

export const isTaxonomiesLoaded = state => state.taxonomies.tree.length && !state.taxonomies.error

export const getTaxonomy = createSelector(
  getAllTaxonomies,
  (state, { id }) => id,
  (taxonomies, id) => taxonomies.find(taxon => taxon.taxonomyId === id)
)

export const getAllTaxons = createSelector(
  getAllTaxonomies,
  (taxonomies) => {
    const taxonsArray = taxonomies.reduce((arr, taxon) => arr.concat(taxon.flatten()), [])
    const map = {}
    taxonsArray.forEach((taxon) => {
      map[taxon.id] = taxon
    })
    return map
  }
)

export const getTaxon = createSelector(
  getAllTaxons,
  (state, { id }) => id,
  (taxons, id) => taxons[id]
)

export const getBreadcrumb = createSelector(
  getAllTaxons,
  (_, { id }) => id,
  // eslint-disable-next-line prefer-arrow-callback
  function breadcrumb(taxons, id) {
    let taxon = taxons[id]
    const result = [ taxon ]
    let i = 0
    while(taxon.parentId && ++i < 10) {
      taxon = taxons[taxon.parentId]
      result.unshift(taxon)
    }
    return result
  }
)

// products
export const getAllProducts = state => state.products

export const getProduct = createSelector(
  getAllProducts,
  (state, { id }) => id,
  (products, id) => products[id]
)

export const getProductError = createSelector(
  getProduct,
  product => (product ? product.error : undefined)
)

export const isProductLoaded = createSelector(
  getProduct,
  product => (product && !product.error)
)

// page.location
export const getLocation = state => state.page.location

export const getPagination = createSelector(
  getLocation,
  location => location.pagination
)

export const getCurrentPage = createSelector(
  getPagination,
  pagination => pagination.currentPage
)

// page.pages
export const getAllPages = state => state.page.pages

export const getPageData = createSelector(
  getAllPages,
  (state, props = {}) => props.page || getCurrentPage(state),
  (pages, currentPage) => pages[currentPage]
)

export const getPageError = createSelector(
  getPageData,
  page => (page ? page.error : undefined)
)

export const isPageLoaded = createSelector(
  getPageData,
  page => (page && !page.error)
)

export const getPageProducts = createSelector(
  getPageData,
  getAllProducts,
  (page, products) => (
    (page && page.products) ? page.products.map(id => products[id]) : undefined
  )
)

export const getPageTaxons = createSelector(
  getPageData,
  getAllTaxons,
  (page, taxons) => (
    (page && page.taxons) ? page.taxons.map(id => taxons[id]) : undefined
  )
)

// auth
export const getLoggedInUser = state => state.auth.user

export const isUserLoggedIn = state => state.auth.user && state.auth.user.id

export const isAuthLoading = state => state.auth.loading

export const getAuthError = state => state.auth.error
