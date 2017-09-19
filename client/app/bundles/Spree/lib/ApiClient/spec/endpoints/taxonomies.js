/* eslint-env mocha */
import { Taxonomy } from "../../resources"
import { page, get } from "./methods"
import * as mock from "../mock"

const taxonomies = Array.from(Array(5), (_, i) => mock.taxonomy(i + 1, {
  taxons: [
    { name: "Child 1" },
    { name: "Child 2" },
    { name: "Child 3" }
  ]
}))

describe("#taxonomies", () => {
  describe("#page()", page(Taxonomy, taxonomies))
  describe("#get()", get(Taxonomy, taxonomies[0]))
})
