import ReactOnRails from "react-on-rails"
import { HYDRATE } from "app/lib/hydrateStore"

export const LOGIN = "auth/LOGIN"
export const LOGOUT = "auth/LOGOUT"
export const REQUEST = "auth/REQUEST"
export const SUCCESS = "auth/SUCCESS"
export const FAILURE = "auth/FAILURE"
export const REFRESH_TOKEN = "auth/REFRESH_TOKEN"
export const UPDATE_TOKEN = "auth/UPDATE_TOKEN"

export const login = data => ({ type: LOGIN, data })
export const logout = () => ({ type: LOGOUT })
export const request = () => ({ type: REQUEST })
export const succeed = user => ({ type: SUCCESS, user })
export const fail = error => ({ type: FAILURE, error })
export const refreshToken = () => ({ type: REFRESH_TOKEN })
export const updateToken = token => ({ type: UPDATE_TOKEN, token })

const initialState = {
  user: undefined,
  loading: false,
  error: undefined,
  token: ReactOnRails.authenticityToken()
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        user: action.user,
        loading: false,
        error: undefined
      }
    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case HYDRATE:
      if(!action.payload.user) return state
      return {
        loading: false,
        user: action.payload.user
      }
    default:
      return state
  }
}
