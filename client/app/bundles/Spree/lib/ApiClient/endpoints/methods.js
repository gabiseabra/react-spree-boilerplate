import qs from "querystring"
import Collection from "../resources/Collection"
import * as query from "../query"

export const page = Entity => async function (pageNum, { search, perPage } = {}) {
  const queryString = qs.stringify(Object.assign(
    query.search(search || {}),
    query.pagination({ page: pageNum, perPage })
  ))
  const targetUrl = `${Entity.href()}?${queryString}`
  const data = await this.json(targetUrl, {
    method: "GET"
  })
  return new Collection(data, Entity)
}

export const get = Entity => async function (id) {
  const data = await this.json(Entity.href(id), {
    method: "GET"
  })
  return new Entity(data)
}

export const hydrate = Entity => async function (data) {
  if(Entity.collection in data) {
    const collection = new Collection(data, Entity)
    return { [Entity.collection]: Array.from(collection) }
  }
  return {}
}
