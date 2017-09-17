import Resource from "../resources/Resource"
import Collection from "../resources/Collection"

export default function createEndpoint(api, fn) {
  const callback = fn.bind(api)
  return async (...args) => {
    const resource = await callback(...args)
    if(resource instanceof Resource || resource instanceof Collection) {
      api.store(resource)
    }
    return resource
  }
}
