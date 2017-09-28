import { HYDRATE } from "app/lib/hydrateStore"

const initialState = []

export default function taxonomies(state = initialState, action) {
  switch(action.type) {
    case HYDRATE:
      if(!action.payload.taxonomies) return state
      return action.payload.taxonomies
    default:
      return state
  }
}
