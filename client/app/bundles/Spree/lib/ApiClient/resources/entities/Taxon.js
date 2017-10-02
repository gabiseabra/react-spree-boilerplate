import Resource from "../Resource"

export default class Taxon extends Resource {
  static collection = "taxons"

  constructor(data) {
    super()
    this.id = data.id
    this.parentId = data.parent_id
    this.taxonomyId = data.taxonomy_id
    this.name = data.name
    this.position = data.position
    this.taxons = data.taxons.map(t => new Taxon(t))
    this.permalink = `/t/${data.permalink}`
  }
}
