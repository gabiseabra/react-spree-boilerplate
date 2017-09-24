import ReactOnRails from "react-on-rails"
import hydrateStore, { hydrate } from "app/lib/hydrateStore"
import { withStore as _withStore } from "app/components"
import _createStore from "./store"
import ApiClient from "../lib/ApiClient"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore(function * (railsContext) {
  const { scheme, host, port, pathname, search } = railsContext
  const apiClient = new ApiClient(`${scheme}://${host}:${port}/`, {
    csrfToken: ReactOnRails.authenticityToken()
  })
  const store = _createStore({ apiClient })
  const hydrateProps = (props) => {
    const finalProps = apiClient.hydrate(props)
    store.dispatch(hydrate(finalProps, railsContext))
  }
  yield store
  hydrateProps({ search, path: pathname })
  // Parse hydration data from server
  while(true) {
    const props = yield
    hydrateProps(props)
  }
})

export const withStore = _withStore(STORE_NAME)
