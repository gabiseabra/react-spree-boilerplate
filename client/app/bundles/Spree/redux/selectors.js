export const getProduct = (state, id) => state.products[id]

export const getProductError = (state, id) => state.products[id].error

export const isProductLoaded = (state, id) => state.products[id] && !state.products[id].error

export const getPage = (state, page = 1) => state.page.data[page]

export const getPageError = (state, page = 1) => state.page.data[page].error

export const isPageLoaded = (state, page = 1) => state.page.data[page] && !state.page.data[page].error

export const getPagination = (state) => state.page.pagination

export const hasPagination = (state) => state.page.pagination !== undefined

export const getLocation = (state) => state.page.location
