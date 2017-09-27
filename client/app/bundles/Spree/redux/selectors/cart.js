export const hasCart = state => state.cart.data !== undefined

export const getOrder = state => state.cart.data

export const getOrderError = state => state.cart.error

export const isOrderLoading = state => state.cart.loading

