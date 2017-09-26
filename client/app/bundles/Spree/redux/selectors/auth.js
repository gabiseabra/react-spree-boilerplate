export const getLoggedInUser = state => state.auth.user

export const isUserLoggedIn = state => state.auth.user && state.auth.user.id

export const isAuthLoading = state => state.auth.loading

export const getAuthError = state => state.auth.error
