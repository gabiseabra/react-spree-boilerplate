import store from "./store"
import saga from "./saga"
import ApiClient from "../lib/ApiClient"
import hydrateStore from "../../../lib/hydrateStore"
import _withStore from "../../../lib/withStore"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore({
  store,
  saga,
  context(railsContext) {
    return {
      apiClient: new ApiClient({
        url: railsContext.href
      })
    }
  }
})

export const withStore = _withStore.bind(undefined, STORE_NAME)
