export default class Taxon {
  constructor(data, parent, taxonomy) {
    this.parent = parent
    this.taxonomy = taxonomy
    this.id = data.id
    this.parentId = data.parent_id
    this.taxonomyId = data.taxonomy_id
    this.name = data.name
    this.permalink = data.permalink
    this.position = data.position
    this.taxons = data.taxons.map(t => new Taxon(t))
  }

  get breadcrumbs() {
    const name = (this.parent ? this.parent.breadcrumbs() : [])
    name.push(this.name)
    return name
  }

  flatten() {
    return this.taxons.reduce((array, taxon) => (
      array.concat(taxon.flatten())
    ), [ this ])
  }
}
