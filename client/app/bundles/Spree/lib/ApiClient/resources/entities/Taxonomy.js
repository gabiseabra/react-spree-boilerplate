import Taxon from "./Taxon"

export default class Taxonomy extends Taxon {
  static collection = "taxonomies"

  constructor(data) {
    super(data.root)
  }
}
