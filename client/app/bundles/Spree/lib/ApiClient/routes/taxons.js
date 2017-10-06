import { Map, Product, Taxon } from "../resources"
import Response from "../Response"

export default {
  "/t/:id*": async function (_, { id }) {
    const response = await this.json(`/t/${id.join("/")}`)
    return new Response(response, new Map(response.data, {
      taxon: Taxon,
      products: Product
    }))
  }
}
