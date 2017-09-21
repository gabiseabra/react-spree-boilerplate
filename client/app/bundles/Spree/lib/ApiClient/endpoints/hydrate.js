import hydrateHelpers from "../helpers/hydrate"

// Final hydrate() endpoint
export default (api, endpoints) => async (data) => {
  const finalData = Object.assign({}, data)
  const hydratedData = await Promise.all(
    endpoints.map(name => api[name].hydrate(data))
  )
  Object.assign(finalData, ...hydratedData, hydrateHelpers(data))
  return finalData
}
