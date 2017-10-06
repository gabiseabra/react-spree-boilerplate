import { Collection, Product } from "../resources"
import Response from "../Response"

export default {
  "/": async function () {
    const response = await this.json("/")
    return new Response(response, new Collection(response.data, Product))
  }
}
