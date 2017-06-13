export const getProduct = (state, id) => state.products[id]

export const getProductError = (state, id) => state.products[id].error

export const isProductLoaded = (state, id) => state.products[id] && !state.products[id].error

export const getPage = (state, page = 1) => state.page.pages[page]

export const getPageError = (state, page = 1) => state.page.pages[page].error

export const isPageLoaded = (state, page = 1) => state.page.pages[page] && !state.page.pages[page].error

export const getLocation = (state) => state.page.location

export const hasPagination = (state) => state.page.location.pagination !== undefined
