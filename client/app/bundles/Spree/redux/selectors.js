import { createSelector } from "reselect"

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
  (productList, products) => (productList ? productList.map(id => products[id]) : undefined)
)

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
  taxonomies => taxonomies.reduce((arr, taxon) => arr.concat(taxon.flatten()), [])
)

export const getTaxon = createSelector(
  getAllTaxons,
  (state, { id }) => id,
  (taxons, id) => taxons[id]
)

// auth
export const getLoggedInUser = state => state.auth.user

export const isUserLoggedIn = state => state.auth.user && state.auth.user.id

export const isAuthLoading = state => state.auth.loading

export const getAuthError = state => state.auth.error
