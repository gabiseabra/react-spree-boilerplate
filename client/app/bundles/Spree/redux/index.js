import qs from "qs"
import ReactOnRails from "react-on-rails"
import hydrateStore, { hydrate } from "app/lib/hydrateStore"
import { withStore as _withStore } from "app/components"
import _createStore from "./store"
import ApiClient from "../lib/ApiClient"

export const STORE_NAME = "spreeStore"

export const createStore = context => hydrateStore(function * (railsContext) {
  const { scheme, host, port, pathname, search } = railsContext
  let appUrl = `${scheme}://${host}`
  if(port) appUrl += `:${port}`
  const apiClient = new ApiClient(appUrl, {
    csrfToken: ReactOnRails.authenticityToken()
  })
  const store = _createStore({ apiClient, ...context })
  const hydrateProps = (props) => {
    const finalProps = apiClient.hydrate(props)
    store.dispatch(hydrate(finalProps, railsContext))
  }
  yield store
  store.dispatch(hydrate({
    path: pathname,
    search: (search && qs.parse(search).search) || undefined
  }, railsContext))
  // Parse hydration data from server
  while(true) {
    const props = yield
    hydrateProps(props)
  }
})

export const withStore = _withStore(STORE_NAME)
