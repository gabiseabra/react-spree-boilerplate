import qs from "querystring"
import { Product } from "../resources"
import Collection from "../resources/Collection"
import * as query from "../query"

export default {
  "/": async function ({ search, page, perPage }) {
    const queryString = qs.stringify(Object.assign(
      query.search(search || {}),
      query.pagination({ page, perPage })
    ))
    const data = await this.json(`/?${queryString}`)
    return new Collection(data, Product)
  }
}
