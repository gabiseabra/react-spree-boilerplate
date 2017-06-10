export const HYDRATE = "@@Rails/HYDRATE"

export const hydrate = (payload, context) => ({ type: HYDRATE, payload, context })

export default function hydrateStore(options) {
  const {
    store: createStore,
    saga: createSaga,
    context: parseContext
  } = options
  // eslint-disable-next-line
  let context, store, saga
  return function createHydratedStore(props, railsContext) {
    if(!store) {
      context = parseContext ? parseContext(railsContext) : railsContext
      store = createStore(context)
      if(createSaga) {
        saga = createSaga(context)
        store.runSaga(saga)
      }
    }
    // Dispatch payload from rails app (redux_store)
    store.dispatch(hydrate(props, context))
    return store
  }
}
