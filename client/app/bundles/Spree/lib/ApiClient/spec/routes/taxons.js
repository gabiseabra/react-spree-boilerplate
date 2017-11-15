/* eslint-env mocha */
import { Map, Collection, Product, Taxon } from "../../resources"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1, {
  taxons: [ 1, 2 ]
}))
const taxon = mock.taxon(1)

describe("/t/:id", () => {
  beforeEach(function () {
    this.scope
      .get("/t/foo.json")
      .reply(200, {
        taxon,
        products,
        ...mock.pagination({ totalCount: products.length })
      })
  })

  it("returns a taxon and a collection of products", async function () {
    const response = await this.client.route("/t/foo")
    response.data.should.be.instanceof(Map)
    response.data.taxon.should.be.instanceof(Taxon)
    response.data.products.should.be.instanceof(Collection)
    response.data.products.Entity.should.equal(Product)
  })
})
