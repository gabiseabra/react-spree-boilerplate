import _ from "lodash"
// eslint-disable-next-line import/extensions
import Router from "universal-router"
import hydrate from "./hydrate"
import route from "./route"

const createEndpoint = (api, callback) => callback.bind(api)

function entityEndpoints(api, entities) {
  const hydrateEndpoints = []
  const result = {}
  _.values(entities).forEach((Entity) => {
    if(!Entity.collection || _.isEmpty(Entity.endpoints)) return
    const name = Entity.collection
    const methods = {}
    if("hydrate" in Entity.endpoints) {
      hydrateEndpoints.push(name)
    }
    _.keys(Entity.endpoints).forEach((key) => {
      methods[key] = createEndpoint(api, Entity.endpoints[key])
    })
    result[name] = methods
  })
  result.hydrate = hydrate(api, hydrateEndpoints)
  return result
}

function routerEndpoints(api, routes) {
  const finalRoutes = Object.keys(routes).map(path => ({
    path,
    action: createEndpoint(api, routes[path])
  }))
  const router = new Router(finalRoutes, {
    context: { api }
  })
  return { route: route(api, router) }
}

export default function createEndpoints(api, { entities, routes }) {
  return {
    ...entityEndpoints(api, entities),
    ...routerEndpoints(api, routes)
  }
}
