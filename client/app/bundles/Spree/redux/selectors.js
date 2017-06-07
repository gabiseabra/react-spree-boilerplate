export const getProduct = (state, id) => state.products[id]

export const getProductError = (state, id) => state.products[id].error

export const isProductLoaded = (state, id) => state.products[id] && !state.products[id].error
