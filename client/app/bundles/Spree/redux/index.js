import hydrateStore, { hydrate } from "app/lib/hydrateStore"
import { withStore as _withStore } from "app/components"
import _createStore from "./store"
import ApiClient from "../lib/ApiClient"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore(function * (railsContext) {
  const apiClient = new ApiClient(railsContext)
  const store = _createStore({ apiClient })
  yield store
  // Parse hydration data from server
  while(true) {
    const props = yield
    const finalProps = apiClient.hydrate(props)
    store.dispatch(hydrate(finalProps, railsContext))
  }
})

export const withStore = _withStore(STORE_NAME)
