import hydrateHelpers from "../helpers/hydrate"

// Final hydrate() endpoint
export default (api, endpoints) => (data) => {
  const finalData = Object.assign({}, data)
  const hydratedData = endpoints.map(name => api[name].hydrate(data))
  Object.assign(
    finalData,
    hydrateHelpers(data),
    ...hydratedData
  )
  return finalData
}
