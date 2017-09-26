import _ from "lodash"
import qs from "querystring"
import { Collection } from "../resources"
import Response from "../Response"
import { pagination, search } from "../helpers"

export const page = (Entity, buildQuery) => async function (pageNum, props = {}) {
  const query = Object.assign(
    pagination.query({ page: pageNum, perPage: props.perPage }),
    props.search ? search.query(props.search) : {},
    buildQuery ? buildQuery(props) : {}
  )
  const queryString = qs.stringify(_.pickBy(query, n => n !== undefined))
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
