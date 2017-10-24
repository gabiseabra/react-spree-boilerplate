import { HYDRATE } from "app/lib/hydrateStore"
import * as order from "../cart/order"
import * as products from "../products"
import * as page from "../page"

export const DISMISS = "flash/DISMISS"
export const DISMISS_ALL = "flash/DISMISS_ALL"

export const dismiss = id => ({ type: DISMISS, id })
export const dismissAll = () => ({ type: DISMISS_ALL })

let ID = 0

// eslint-disable-next-line no-plusplus
const nextId = () => ID++

const initialState = []

export default function flash(state = initialState, action) {
  switch(action.type) {
    case DISMISS:
      return state.filter(({ id }) => id !== action.id)
    case DISMISS_ALL:
    case page.REQUEST:
      return []
    case order.FAILURE:
    case page.FAILURE:
    case products.FAILURE:
      return [
        ...state,
        {
          id: nextId(),
          type: "error",
          message: action.error.message
        }
      ]
    case HYDRATE:
      if(!action.payload.flash) return state
      return action.payload.flash.map(data => ({ ...data, id: nextId() }))
    default:
      return state
  }
}
