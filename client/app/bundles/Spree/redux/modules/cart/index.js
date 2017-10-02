import { HYDRATE } from "app/lib/hydrateStore"

export const ADD = "cart/ADD"
// export const EDIT = "cart/EDIT"
export const EMPTY = "cart/EMPTY"
export const REQUEST = "cart/REQUEST"
export const SUCCESS = "cart/SUCCESS"
export const FAILURE = "cart/FAILURE"

export const add = (variantId, quantity = 1) => ({ type: ADD, variantId, quantity })
// export const edit = (variantId, quantity) => ({ type: REMOVE, variantId, quantity })
export const empty = () => ({ type: EMPTY })
export const request = () => ({ type: REQUEST })
export const succeed = ({ lineItems, ...order }) => ({ type: SUCCESS, order, lineItems })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  order: undefined,
  lineItems: [],
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
      const { lineItems, ...order } = action.payload.order
      return {
        ...state,
        order,
        lineItems
      }
    }
    default:
      return state
  }
}
