export const HYDRATE = "@@Rails/HYDRATE"

export const hydrate = (payload, context) => ({ type: HYDRATE, payload, context })

/**
 * Create react_on_rails store generator function
 */
export default function hydrateStore(storeGenerator) {
  let iter
  let store
  return function createHydratedStore(props, railsContext) {
    if(!store) {
      iter = storeGenerator(railsContext)
      store = iter.next().value
      iter.next()
    }
    iter.next(props)
    return store
  }
}
