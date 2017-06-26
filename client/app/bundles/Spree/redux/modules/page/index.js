import { combineReducers } from "redux"
import { HYDRATE } from "app/lib/hydrateStore"
import { Pagination, Search } from "../../../lib/ApiClient/models"

export const LOAD = "page/LOAD"
export const LOAD_PAGE = "page/LOAD_PAGE"
export const REQUEST = "page/REQUEST"
export const REQUEST_PAGE = "page/REQUEST_PAGE"
export const SUCCESS = "page/SUCCESS"
export const FAILURE = "page/FAILURE"

export const load = (path, search, page = 1, perPage) => ({
  type: LOAD,
  search,
  path,
  page,
  perPage
})
export const loadPage = page => ({ type: LOAD_PAGE, page })
export const request = (path, search, page = 1) => ({ type: REQUEST, search, path, page })
export const requestPage = page => ({ type: REQUEST_PAGE, page })
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
    pagination: {
      currentPage: undefined
    }
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
    case HYDRATE: {
      const { pagination, data } = action.payload
      if(!pagination) return state
      return {
        ...state,
        [pagination.current_page]: data
      }
    }
    default:
      return state
  }
}

function location(state = initialState.location, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        path: action.path,
        search: action.search,
        pagination: { currentPage: action.page }
      }
    case LOAD_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.page
        }
      }
    case SUCCESS:
    case FAILURE:
      return {
        ...state,
        pagination: action.pagination
      }
    case HYDRATE: {
      const { payload, context } = action
      if(!payload.pagination) return state
      const pagination = new Pagination(payload.pagination)
      const search = new Search(context.search)
      return {
        ...state,
        search,
        pagination,
        path: context.pathname
      }
    }
    default:
      return state
  }
}

export default combineReducers({ pages, location })
