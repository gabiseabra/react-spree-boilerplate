import { Product } from "../resources"
import Collection from "../resources/Collection"

export default {
  "/": async function () {
    const data = await this.json("/")
    return new Collection(data, Product)
  }
}
