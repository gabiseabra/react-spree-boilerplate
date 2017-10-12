import { combineReducers } from "redux"
import countries from "./countries"
import states from "./states"

export default combineReducers({ countries, states })

export { load as loadCountries } from "./countries"
export { load as loadStates } from "./states"
