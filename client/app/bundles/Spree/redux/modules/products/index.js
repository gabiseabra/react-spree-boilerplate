import _ from "lodash"
import { HYDRATE } from "../../../../../lib/hydrateStore"
import { Product } from "../../../lib/ApiClient/models"

export const LOAD = "products/LOAD"
export const REQUEST = "products/REQUEST"
export const SUCCESS = "products/SUCCESS"
export const FAILURE = "products/FAILURE"

export const load = id => ({ type: LOAD, id })
export const request = id => ({ type: REQUEST, id })
export const succeed = (id, data) => ({ type: SUCCESS, id, data })
export const fail = (id, error) => ({ type: FAILURE, id, error })

const initialState = {}

export default function products(state = initialState, action) {
  switch(action.type) {
    case SUCCESS:
      return {
        ...state,
        [action.id]: action.data
      }
    case FAILURE:
      return {
        ...state,
        [action.id]: { error: action.error }
      }
    case HYDRATE:
      if(!action.payload.products) return state
      const productsArray = action.payload.products.map(data => new Product(data))
      return {
        ...state,
        ..._.keyBy(productsArray, o => o.id)
      }
    default:
      return state
  }
}
