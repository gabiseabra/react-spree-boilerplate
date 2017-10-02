import Resource from "../Resource"

export default class Taxon extends Resource {
  static collection = "taxons"

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

  get permalink() {
    return `/t/${this.permalinkPath}`
  }

  flatten() {
    return this.taxons.reduce((array, taxon) => (
      array.concat(taxon.flatten())
    ), [ this ])
  }
}
