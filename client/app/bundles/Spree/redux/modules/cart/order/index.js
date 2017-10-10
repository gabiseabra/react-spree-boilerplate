import { HYDRATE } from "app/lib/hydrateStore"

export const LOAD = "cart/order/LOAD"
export const ADD = "cart/order/ADD"
export const EDIT = "cart/order/EDIT"
export const REMOVE = "cart/order/REMOVE"
export const EMPTY = "cart/order/EMPTY"
export const REQUEST = "cart/order/REQUEST"
export const SUCCESS = "cart/order/SUCCESS"
export const FAILURE = "cart/order/FAILURE"

export const load = () => ({ type: LOAD })
export const add = (variantId, quantity = 1) => ({ type: ADD, variantId, quantity })
export const edit = (lineItemId, quantity) => ({ type: EDIT, lineItemId, quantity })
export const remove = lineItemId => ({ type: REMOVE, lineItemId })
export const empty = () => ({ type: EMPTY })
export const request = () => ({ type: REQUEST })
export const succeed = ({ lineItems, ...data }) => ({ type: SUCCESS, data, lineItems })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  data: undefined,
  lineItems: [],
  loading: false,
  error: undefined
}

export default function order(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        data: action.data,
        lineItems: action.lineItems,
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
      if(!action.payload.order) return state
      const { lineItems, ...data } = action.payload.order
      return {
        ...state,
        data,
        lineItems
      }
    }
    default:
      return state
  }
}
