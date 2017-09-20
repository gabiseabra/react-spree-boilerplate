/* eslint-env mocha */
import { Product } from "../../resources"
import Collection from "../../resources/Collection"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1))

const reply = {
  products,
  ...mock.pagination({ page: 1, totalCount: products.length })
}

describe("/", () => {
  it("returns a collection of products", async function () {
    this.scope
      .get("/")
      .query(true)
      .reply(200, reply)

    const collection = await this.client.route("/")
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })

  it("accepts a search parameter", async function () {
    this.scope
    .get("/")
    .query({ q: { name: "test" } })
    .reply(200, reply)

    const collection = await this.client.route("/", {
      search: {
        name: "test"
      }
    })
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })

  it("accepts pagination parameters", async function () {
    this.scope
    .get("/")
    .query({ page: 2, per_page: 15 })
    .reply(200, reply)

    const collection = await this.client.route("/", { page: 2, perPage: 15 })
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Product)
  })
})
