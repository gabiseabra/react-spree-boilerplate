import Response from "../Response"
import Collection from "../resources/Collection"
import buildQuery from "../helpers/query"

export const page = Entity => async function (pageNum, { search, perPage } = {}) {
  const queryString = buildQuery({ search, page: pageNum, perPage })
  const targetUrl = `${Entity.href()}?${queryString}`
  const response = await this.json(targetUrl, {
    method: "GET"
  })
  return new Response(response, new Collection(response.data, Entity))
}

export const get = Entity => async function (id) {
  const response = await this.json(Entity.href(id), {
    method: "GET"
  })
  return new Response(response, new Entity(response.data))
}

export const hydrate = Entity => async function (data) {
  if(Entity.collection in data) {
    const collection = new Collection(data, Entity)
    return { [Entity.collection]: Array.from(collection) }
  }
  return {}
}
