import { HYDRATE } from "app/lib/hydrateStore"

export const LOAD = "taxonomies/LOAD"
export const REQUEST = "taxonomies/REQUEST"
export const SUCCESS = "taxonomies/SUCCESS"
export const FAILURE = "taxonomies/FAILURE"

export const load = () => ({ type: LOAD })
export const request = () => ({ type: REQUEST })
export const succeed = data => ({ type: SUCCESS, data })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  tree: [],
  error: undefined
}

export default function taxonomies(state = initialState, action) {
  switch(action.type) {
    case SUCCESS:
      return {
        tree: action.data
      }
    case FAILURE:
      return {
        error: action.error
      }
    case HYDRATE:
      if(!action.payload.taxonomies) return state
      return {
        tree: action.payload.taxonomies
      }
    default:
      return state
  }
}
