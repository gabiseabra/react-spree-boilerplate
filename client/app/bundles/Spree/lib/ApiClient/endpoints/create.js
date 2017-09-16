import isIterable from "is-iterable"
import Resource from "../resources/Resource"
import Collection from "../resources/Collection"

const getOne = (api, Entity, id) => () => api.get(Entity, id)

const getAll = (api, Entity, ids) => () => ids.map(id => api.get(Entity, id))

function parseRelationships(api, resource, relationships) {
  for(const key of Object.keys(relationships)) {
    const data = resource[key]
    const Entity = relationships[key]
    if(!(Entity instanceof Resource)) {
      parseRelationships(api, data, relationships[key])
    } else {
      const get = (
        isIterable(data) ?
        getAll(api, Entity, data.map(i => i.id)) :
        getOne(api, Entity, data.id)
      )
      Object.defineProperty(resource, key, { get, enumerable: true })
      parseResource(api, data)
    }
  }
}

function parseResource(api, resource) {
  if(isIterable(resource)) {
    for(const instance of resource) {
      parseResource(api, instance)
    }
  } else {
    const Entity = resource.constructor
    resource.api = api
    api.store.set(Entity, resource)
    if(Entity.relationships) {
      parseRelationships(api, resource, Entity.relationships)
    }
  }
}

export default function createEndpoint(api, fn) {
  const callback = fn.bind(api)
  return async (...args) => {
    const resource = await callback(...args)
    if(resource instanceof Resource || resource instanceof Collection) {
      parseResource(resource)
    }
    return resource
  }
}
