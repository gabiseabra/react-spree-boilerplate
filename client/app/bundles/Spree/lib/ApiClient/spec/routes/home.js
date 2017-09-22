/* eslint-env mocha */
import { Collection, Product } from "../../resources"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1))

describe("/", () => {
  const reply = {
    products,
    ...mock.pagination({ page: 1, totalCount: products.length })
  }

  it("returns a collection of products", async function () {
    this.scope
      .get("/")
      .query(true)
      .reply(200, reply)

    const response = await this.client.route("/")
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })

  it("accepts a search parameter", async function () {
    this.scope
    .get("/")
    .query({ q: { name: "test" } })
    .reply(200, reply)

    const response = await this.client.route("/", {
      search: {
        name: "test"
      }
    })
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })

  it("accepts pagination parameters", async function () {
    this.scope
    .get("/")
    .query({ page: 2, per_page: 15 })
    .reply(200, reply)

    const response = await this.client.route("/", { page: 2, perPage: 15 })
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })
})
