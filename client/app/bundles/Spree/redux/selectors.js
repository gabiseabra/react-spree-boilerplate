import { createSelector } from "reselect"

// products
export const getAllProducts = (state) => state.products

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
export const getLocation = (state) => state.page.location

export const getPagination = createSelector(
  getLocation,
  location => location.pagination
)

export const getCurrentPage = createSelector(
  getLocation,
  location => location.currentPage
)

// page.pages
export const getAllPages = (state) => state.page.pages

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
