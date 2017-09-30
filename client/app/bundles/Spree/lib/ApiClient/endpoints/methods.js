import _ from "lodash"
import qs from "querystring"
import Response from "../Response"
import { Collection } from "../resources"
import { pagination, search } from "../helpers"

export const page = (Entity, { href, query, collection }) => (
  async function (pageNum, props = {}) {
    const targetUrl = (
      typeof href === "function" ?
      href(pageNum, props) :
      href
    )
    const params = Object.assign(
      pagination.query({ page: pageNum, perPage: props.perPage }),
      props.search ? search.query(props.search) : {},
      query ? query(pageNum, props) : {}
    )
    const queryString = qs.stringify(_.pickBy(params, n => n !== undefined))
    const response = await this.json(`${targetUrl}?${queryString}`, {
      method: "GET"
    })
    return new Response(response, new Collection(response.data, Entity))
  }
)

export const get = (Entity, { href }) => (
  async function (...args) {
    const targetUrl = (typeof href === "function" ? href(...args) : href)
    const response = await this.json(targetUrl, {
      method: "GET"
    })
    return new Response(response, new Entity(response.data))
  }
)
