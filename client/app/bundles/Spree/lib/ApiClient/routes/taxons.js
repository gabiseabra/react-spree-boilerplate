import qs from "querystring"
import { Map, Product, Taxon } from "../resources"
import Response from "../Response"
import * as helpers from "../helpers"

export default {
  "/t/:id*": async function ({ page, perPage, search }, { id }) {
    const queryString = qs.stringify(Object.assign(
      helpers.pagination.query({ page, perPage }),
      search ? helpers.search.query(search) : {}
    ))
    const targetUrl = `/t/${id.join("/")}`
    const response = await this.json(`${targetUrl}?${queryString}`)
    return new Response(response, new Map(response.data, {
      taxon: Taxon,
      products: Product
    }))
  }
}
