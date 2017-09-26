import qs from "querystring"
import { Collection, Product } from "../resources"
import Response from "../Response"
import * as helpers from "../helpers"

export default {
  "/": async function ({ search, page, perPage }) {
    const queryString = qs.stringify(Object.assign(
      helpers.pagination.query({ page, perPage }),
      helpers.search.query(search)
    ))
    const response = await this.json(`/?${queryString}`)
    return new Response(response, new Collection(response.data, Product))
  }
}
