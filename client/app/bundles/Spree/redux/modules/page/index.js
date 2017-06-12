// import _ from "lodash"
// import { HYDRATE } from "../../../../../lib/hydrateStore"

export const LOAD = "page/LOAD"
export const LOAD_PAGE = "page/LOAD_PAGE"
export const REQUEST = "page/REQUEST"
export const SUCCESS = "page/SUCCESS"
export const FAILURE = "page/FAILURE"

export const load = (location, page = 1, query) => ({ type: LOAD_PAGE, location, page, query })
export const loadPage = (page) => ({ type: LOAD_PAGE, page })
export const request = (location, page = 1) => ({ type: REQUEST, location, page })
export const succeed = (page, data, pagination) => ({ type: SUCCESS, page, data, pagination })
export const fail = (page, error) => ({ type: FAILURE, page, error })

const initialState = {
  data: {},
  location: undefined,
  search: undefined,
  pagination: undefined
}

export default function products(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        data: (state.location === action.location ? state.data : {}),
        location: action.location,
        pagination: undefined
      }
    case SUCCESS:
      return {
        ...state,
        pagination: action.pagination,
        data: {
          ...state.data,
          [action.page]: action.data
        }
      }
    case FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.page]: { error: action.error }
        }
      }
    default:
      return state
  }
}
