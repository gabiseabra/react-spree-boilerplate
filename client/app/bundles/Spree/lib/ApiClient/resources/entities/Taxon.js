import Resource from "../Resource"
import { page } from "../../endpoints/methods"

export default class Taxon extends Resource {
  static baseUrl = "/api/v1/taxons"

  static collection = "taxons"

  static methods = {
    page: page(Taxon)
  }

  constructor(data) {
    super()
    this.id = data.id
    this.parentId = data.parent_id
    this.taxonomyId = data.taxonomy_id
    this.name = data.name
    this.permalinkPath = data.permalink
    this.position = data.position
    this.taxons = data.taxons.map(t => new Taxon(t))
  }

  static hydrate({ taxons }) {
    if(taxons) {
      return { taxons: taxons.map(data => new Taxon(data)) }
    }
    return {}
  }

  get permalink() {
    return `/t/${this.permalinkPath}`
  }

  flatten() {
    return this.taxons.reduce((array, taxon) => (
      array.concat(taxon.flatten())
    ), [ this ])
  }
}
