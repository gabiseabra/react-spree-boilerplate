import { createSelector } from "reselect"

export const getProduct = (state, id) => state.products[id]

export const getProductError = (state, id) => state.products[id].error

export const isProductLoaded = (state, id) => state.products[id] && !state.products[id].error

export const getLocation = (state) => state.page.location

export const getCurrentPage = (state) => state.page.currentPage

export const getAllPages = (state) => state.page.pages

export const getPageData = createSelector(
  getAllPages,
  (state, props) => props.page || getCurrentPage(state),
  (pages, currentPage) => pages[currentPage]
)

export const getPageError = createSelector(
  getPageData,
  (page) => page.error
)

export const isPageLoaded = createSelector(
  getPageData,
  (page) => page && !page.error
)
