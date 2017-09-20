import qs from "querystring"
import Response from "../Response"
import { Product } from "../resources"
import Collection from "../resources/Collection"
import * as query from "../query"

export default {
  "/": async function ({ search, page, perPage }) {
    const queryString = qs.stringify(Object.assign(
      query.search(search || {}),
      query.pagination({ page, perPage })
    ))
    const response = await this.json(`/?${queryString}`)
    return new Response(response, new Collection(response.data, Product))
  }
}
