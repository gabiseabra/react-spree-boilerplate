export const HYDRATE = "@@Rails/HYDRATE"

export const hydrate = (payload, context) => ({ type: HYDRATE, payload, context })

export default function hydrateStore(createStore, createSaga, parseContext) {
  let context, store, saga
  return function createHydratedStore(props, railsContext) {
    if(!store) {
      context = parseContext ? parseContext(railsContext) : railsContext
      store = createStore(context)
      saga = createSaga(context)
    }
    // Dispatch payload from rails app (redux_store)
    store.dispatch(hydrate(props, context))
    return store
  }
}
