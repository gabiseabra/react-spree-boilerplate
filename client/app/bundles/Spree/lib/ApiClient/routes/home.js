import { Collection, Product } from "../resources"
import Response from "../Response"
import buildQuery from "../helpers/query"

export default {
  "/": async function ({ search, page, perPage }) {
    const queryString = buildQuery({ search, page, perPage })
    const response = await this.json(`/?${queryString}`)
    return new Response(response, new Collection(response.data, Product))
  }
}
