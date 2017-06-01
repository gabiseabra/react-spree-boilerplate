export const HYDRATE = "@@Rails/HYDRATE"

export const hydrate = (payload, context = {}) => ({ type: HYDRATE, payload, context })

export default function hydrateStore(createStore) {
  let store
  return function createHydratedStore(props, railsContext) {
    if(!store) {
      store = createStore()
    }
    // Dispatch payload from rails app (redux_store)
    store.dispatch(hydrate(props, railsContext))
    return store
  }
}
