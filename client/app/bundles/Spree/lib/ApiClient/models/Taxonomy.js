import Taxon from "./Taxon"

export default class Taxonomy extends Taxon {
  constructor(data) {
    super(data.root)
  }
}
