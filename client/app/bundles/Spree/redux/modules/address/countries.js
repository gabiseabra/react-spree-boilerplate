import _ from "lodash"
import { HYDRATE } from "app/lib/hydrateStore"

const initialState = {
}

const byId = array => _.keyBy(array, i => i.id)

// Countries are only required in the checkout page, which is always requested
// by POST, so no need to fetch countries from server - data already comes
// hydrated from the checkout controller.
export default function countries(state = initialState, action) {
  switch(action.type) {
    case HYDRATE: {
      const { payload } = action
      return {
        ...state,
        ...(payload.countries ? byId(payload.countries) : {})
      }
    }
    default:
      return state
  }
}
