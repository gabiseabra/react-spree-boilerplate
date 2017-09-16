import Taxon from "./Taxon"
import { page, get, hydrate } from "../endpoints/methods"

export default class Taxonomy extends Taxon {
  static baseUrl = "/api/v1/taxonomies"

  static collection = "taxonomies"

  static endpoints = {
    page: page(Taxonomy),
    get: get(Taxonomy),
    hydrate: hydrate(Taxonomy)
  }

  constructor(data) {
    super(data.root)
  }
}
