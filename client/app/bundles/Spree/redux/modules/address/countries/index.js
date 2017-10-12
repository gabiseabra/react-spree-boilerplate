import _ from "lodash"
import { HYDRATE } from "app/lib/hydrateStore"

export const LOAD = "address/countries/LOAD"
export const REQUEST = "address/countries/REQUEST"
export const SUCCESS = "address/countries/SUCCESS"
export const FAILURE = "address/countries/FAILURE"

export const load = () => ({ type: LOAD })
export const request = () => ({ type: REQUEST })
export const succeed = data => ({ type: SUCCESS, data })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  data: {},
  loading: false,
  error: undefined
}

const byId = array => _.keyBy(array, i => i.id)

export default function countries(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        data: byId(action.data),
        loading: false,
        error: undefined
      }
    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case HYDRATE: {
      const { payload } = action
      return {
        ...state,
        data: payload.countries ? byId(payload.countries) : {}
      }
    }
    default:
      return state
  }
}
