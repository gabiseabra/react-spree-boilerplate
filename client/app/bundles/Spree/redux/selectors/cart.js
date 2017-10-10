export const hasCart = state => state.cart.order.data !== undefined

export const getLineItems = state => state.cart.order.lineItems

export const getOrder = state => state.cart.order.data

export const getOrderError = state => state.cart.order.error

export const isOrderLoading = state => state.cart.order.loading

export const getCouponError = state => state.cart.coupon.error

export const getCouponMessage = state => state.cart.coupon.message

export const isCouponLoading = state => state.cart.coupon.loading

