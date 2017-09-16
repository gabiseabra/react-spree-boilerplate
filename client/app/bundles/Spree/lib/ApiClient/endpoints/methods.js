import Collection from "../resources/Collection"

export const page = Entity => async function (pageNum, { search, perPage }) {
  const queryString = buildQuery({ page: pageNum, perPage, search })
  const targetUrl = `${Entity.href()}?${queryString}`
  const data = this.json(targetUrl, {
    method: "GET"
  })
  return Collection(data, Entity)
}

export const get = Entity => async function (id) {
  const data = this.json(Entity.href(id), {
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
