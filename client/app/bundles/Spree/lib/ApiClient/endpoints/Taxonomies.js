import Endpoint from "./Endpoint"
import { Taxonomy } from "../models"

export default class Taxonomies extends Endpoint {
  Entity = Taxonomy

  routes = () => [
    {
      path: "/api/taxonomies/:id",
      action: this.getAll
    },
    {
      path: "/api/taxonomies/:id",
      action: ({ params: { id }, ...context }) => this.getAll(id, context)
    }
  ]

  getAll = ({ nested }) => {
    const query = (nested ? "set=nested" : "")
    return this.fetch(`/api/v1/taxonomies?${query}`, { collection: "taxonomies" })
  }

  get = (id, { nested }) => {
    const query = (nested ? "set=nested" : "")
    return this.fetch(`/api/v1/taxonomies/${id}?${query}`)
  }
}
