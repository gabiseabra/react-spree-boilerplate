import { HYDRATE } from "app/lib/hydrateStore"

export const CREATE = "cart/CREATE"
// export const ADD = "cart/ADD"
// export const EDIT = "cart/EDIT"
export const EMPTY = "cart/EMPTY"
export const REQUEST = "cart/REQUEST"
export const SUCCESS = "cart/SUCCESS"
export const FAILURE = "cart/FAILURE"

export const create = (variantId, quantity = 1) => ({ type: CREATE, variantId, quantity })
// export const add = (variantId, quantity = 1) => ({ type: ADD, variantId, quantity })
// export const edit = (variantId, quantity) => ({ type: REMOVE, variantId, quantity })
export const empty = () => ({ type: EMPTY })
export const request = () => ({ type: REQUEST })
export const succeed = order => ({ type: SUCCESS, order })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  order: undefined,
  loading: false,
  error: undefined
}

export default function cart(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        order: action.order,
        loading: false,
        error: undefined
      }
    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case HYDRATE:
      if(!action.payload.order) return state
      return {
        ...state,
        order: action.payload.order
      }
    default:
      return state
  }
}
