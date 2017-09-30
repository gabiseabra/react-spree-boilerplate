import Taxon from "./Taxon"

export default class Taxonomy extends Taxon {
  static collection = "taxonomies"

  constructor(data) {
    super(data.root)
  }

  static hydrate({ taxonomies }) {
    if(taxonomies) {
      return { [Taxonomy.collection]: taxonomies.map(data => new Taxonomy(data)) }
    }
    return {}
  }
}
