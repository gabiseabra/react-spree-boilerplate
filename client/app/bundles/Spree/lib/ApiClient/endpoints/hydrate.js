import { hydrate as hydratePagination } from "../resources/Collection"

// Final hydrate() endpoint
export default (api, endpoints) => async (data) => {
  const finalData = Object.assign({}, data)
  const hydratedData = await Promise.all(
    endpoints.map(name => api[name].hydrate(data))
  )
  Object.assign(finalData, ...hydratedData, hydratePagination(data))
  return finalData
}
