import Taxon from "./Taxon"
import { page, get } from "../../endpoints/methods"

export default class Taxonomy extends Taxon {
  static baseUrl = "/api/v1/taxonomies"

  static collection = "taxonomies"

  static endpoints = {
    page: page(Taxonomy, ({ nested }) => ({
      set: nested ? "nested" : undefined
    })),
    get: get(Taxonomy)
  }

  constructor(data) {
    super(data.root)
  }

  static hydrate({ taxonomies }) {
    if(taxonomies) {
      return { taxonomies: taxonomies.map(data => new Taxonomy(data)) }
    }
    return {}
  }
}
