export const HYDRATE = "@@Rails/HYDRATE"

export const hydrate = (payload, context) => ({ type: HYDRATE, payload, context })

export default function hydrateStore(options) {
  const {
    store: createStore,
    context: parseContext
  } = options
  // eslint-disable-next-line
  let context, store
  return function createHydratedStore(props, railsContext) {
    if(!store) {
      context = parseContext ? parseContext(railsContext) : railsContext
      store = createStore(context)
    }
    store.dispatch(hydrate(props, context))
    return store
  }
}
