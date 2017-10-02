import _ from "lodash"
import { HYDRATE } from "app/lib/hydrateStore"

export const LOAD = "products/LOAD"
export const REQUEST = "products/REQUEST"
export const SUCCESS = "products/SUCCESS"
export const FAILURE = "products/FAILURE"

export const load = id => ({ type: LOAD, id })
export const request = id => ({ type: REQUEST, id })
export const succeed = (id, { variants, ...data }) => ({ type: SUCCESS, id, data, variants })
export const fail = (id, error) => ({ type: FAILURE, id, error })

const initialState = {
  data: {},
  slugs: {},
  variants: {}
}

const byId = array => _.keyBy(array, i => i.id)

export default function products(state = initialState, action) {
  switch(action.type) {
    case SUCCESS:
      return {
        slugs: {
          ...action.slugs,
          [action.data.slug]: action.id
        },
        data: {
          ...action.data,
          [action.id]: action.data
        },
        variants: {
          ...action.data,
          [action.id]: byId(action.variants)
        }
      }
    case FAILURE:
      return {
        ...state,
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
          result.variants[product.id] = byId(product.variants)
        })
      }
      if(payload.variants) {
        payload.variants.forEach((variant) => {
          const id = result.slugs[variant.slug]
          if(id) {
            result.variants[id][variant.id] = variant
          }
        })
      }
      return result
    }
    default:
      return state
  }
}
