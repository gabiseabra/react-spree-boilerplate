/* eslint-env mocha */
import { Taxon } from "../../resources"
import { page } from "./methods"
import * as mock from "../mock"

const taxonomies = Array.from(Array(5), (_, i) => mock.taxon(i + 1, {
  taxons: [
    { name: "Child 1" },
    { name: "Child 2" },
    { name: "Child 3" }
  ]
}))

describe("#taxons", () => {
  describe("#page()", page(Taxon, taxonomies))
})
