import store from "./store"
import ApiClient from "../lib/ApiClient"
import hydrateStore from "../../../lib/hydrateStore"
import { withStore as _withStore } from "../../../components"

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
