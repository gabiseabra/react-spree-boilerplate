import { search, pagination } from "../helpers"

// Final hydrate() endpoint
export default (api, endpoints) => (data) => {
  const hydratedData = endpoints.map(callback => callback(data))
  const finalData = Object.assign({}, data, ...hydratedData)
  if(data.pagination) {
    finalData.pagination = pagination.parse(data.pagination)
  }
  if(data.search) {
    finalData.search = search.parse(data.search)
  }
  return finalData
}
