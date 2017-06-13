// import _ from "lodash"
// import { HYDRATE } from "../../../../../lib/hydrateStore"
import { combineReducers } from "redux"

export const LOAD = "page/LOAD"
export const LOAD_PAGE = "page/LOAD_PAGE"
export const REQUEST = "page/REQUEST"
export const REQUEST_PAGE = "page/REQUEST_PAGE"
export const SUCCESS = "page/SUCCESS"
export const FAILURE = "page/FAILURE"

export const load = (path, search, page = 1, perPage) => ({
  type: LOAD_PAGE,
  search,
  path,
  page,
  perPage
})
export const loadPage = (page) => ({ type: LOAD_PAGE, page })
export const request = (path, search, page = 1) => ({ type: REQUEST, search, path, page })
export const requestPage = (page) => ({ type: REQUEST_PAGE, page })
export const fail = (page, error, pagination) => ({
  type: FAILURE,
  page,
  error,
  pagination
})
export const succeed = (page, data, pagination) => ({
  type: SUCCESS,
  page,
  data,
  pagination
})

const initialState = {
  pages: {},
  location: {
    path: undefined,
    search: undefined,
    currentPage: undefined,
    pagination: undefined
  }
}

function pages(state = initialState.pages, action) {
  switch(action.type) {
    case REQUEST:
      return {}
    case SUCCESS:
      return {
        ...state,
        [action.page]: action.data
      }
    case FAILURE:
      return {
        ...state,
        [action.page]: { error: action.error }
      }
    default:
      return state
  }
}

function location(state = initialState.location, action) {
  const currentPage = action.page || (action.pagination && action.pagination.currentPage)
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        currentPage,
        path: action.path,
        search: action.search,
        pagination: undefined
      }
    case REQUEST_PAGE:
      return {
        ...state,
        currentPage
      }
    case SUCCESS:
    case FAILURE:
      return {
        ...state,
        currentPage,
        pagination: action.pagination
      }
    default:
      return state
  }
}

export default combineReducers({ pages, location })
