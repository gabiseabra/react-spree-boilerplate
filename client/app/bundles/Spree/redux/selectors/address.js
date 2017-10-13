import { createSelector } from "reselect"

export const getAllCountries = state => Object.values(state.address.countries)

export const getAllStates = state => state.address.states.data

export const isStatesLoading = state => state.address.states.loading

export const getStatesError = state => state.address.states.error

export const getState = createSelector(
  getAllStates,
  (state, { countryId }) => countryId,
  (states, countryId) => states[countryId]
)
