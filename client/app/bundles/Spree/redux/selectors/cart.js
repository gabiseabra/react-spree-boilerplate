export const hasCart = state => state.cart.order !== undefined

export const getLineItems = state => state.cart.lineItems

export const getOrder = state => state.cart.order

export const getOrderError = state => state.cart.error

export const isOrderLoading = state => state.cart.loading

