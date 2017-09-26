import _ from "lodash"
import { HYDRATE } from "app/lib/hydrateStore"

export const LOAD = "products/LOAD"
export const REQUEST = "products/REQUEST"
export const SUCCESS = "products/SUCCESS"
export const FAILURE = "products/FAILURE"

export const load = id => ({ type: LOAD, id })
export const request = id => ({ type: REQUEST, id })
export const succeed = (id, data) => ({ type: SUCCESS, id, data })
export const fail = (id, error) => ({ type: FAILURE, id, error })

const initialState = {
  data: {},
  slugs: {}
}

export default function products(state = initialState, action) {
  switch(action.type) {
    case SUCCESS:
      return {
        slugs: {
          ...action.slugs,
          [action.slug]: action.id
        },
        data: {
          ...action.data,
          [action.id]: action.data
        }
      }
    case FAILURE:
      return {
        ...state,
        slugs: {
          ...action.slugs,
          [action.slug]: action.id
        },
        data: {
          ...action.data,
          [action.id]: { error: action.error }
        }
      }
    case HYDRATE: {
      const { payload } = action
      const result = { ...state }
      if(payload.products) {
        payload.products.forEach((product) => {
          result.slugs[product.slug] = product.id
          result.data[product.id] = product
        })
      }
      if(payload.variants) {
        payload.variants.forEach((variant) => {
          const id = result.slugs[variant.slug]
          if(id) {
            const targetProduct = result.data[id]
            targetProduct.variants[variant.id] = variant
          }
        })
      }
      return result
    }
    default:
      return state
  }
}

