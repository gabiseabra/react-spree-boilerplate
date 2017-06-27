import Taxon from "./Taxon"

export default class Taxonomy extends Taxon {
  static collection = "taxonomies"

  constructor(data) {
    super(data.root)
  }

  static hydrate(taxonomies) {
    return taxonomies.map(t => new Taxonomy(t))
  }
}
