import store from "./store"
import ApiClient from "../lib/ApiClient"
import hydrateStore from "../../../lib/hydrateStore"
import _withStore from "../../../lib/withStore"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore({
  store,
  context(railsContext) {
    return {
      ...railsContext,
      apiClient: new ApiClient({
        url: railsContext.href
      })
    }
  }
})

export const withStore = _withStore(STORE_NAME)
