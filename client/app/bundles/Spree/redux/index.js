import hydrateStore from "app/lib/hydrateStore"
import { withStore as _withStore } from "app/components"
import store from "./store"
import ApiClient from "../lib/ApiClient"

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
