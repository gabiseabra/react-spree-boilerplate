import hydrateStore from "app/lib/hydrateStore"
import { withStore as _withStore } from "app/components"
import store from "./store"
import ApiClient from "../lib/ApiClient"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore(function * (railsContext) {
  const { scheme, host, port } = railsContext
  const apiClient = new ApiClient(`${scheme}://${host}:${port}/`)
  const context = { apiClient }
  // Create store
  yield store(context)
  // Parse hydration data from server
  while(true) {
    const props = yield
    yield apiClient.hydrate(props)
  }
})

export const withStore = _withStore(STORE_NAME)
