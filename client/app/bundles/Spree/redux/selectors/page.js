import { createSelector } from "reselect"
import { getAllProducts } from "./products"
import { getAllTaxons } from "./taxonomies"

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
