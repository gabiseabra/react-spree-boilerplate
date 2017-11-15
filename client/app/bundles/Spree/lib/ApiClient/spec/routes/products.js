/* eslint-env mocha */
import { Collection, Product } from "../../resources"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1))

describe("/products", () => {
  const reply = {
    products,
    ...mock.pagination({ page: 1, totalCount: products.length })
  }

  it("returns a collection of products", async function () {
    this.scope
      .get("/products.json")
      .query(true)
      .reply(200, reply)

    const response = await this.client.route("/products")
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })

  it("accepts a search parameter", async function () {
    this.scope
    .get("/products.json")
    .query({ search: { name: "test" } })
    .reply(200, reply)

    const response = await this.client.route("/products", {
      search: {
        name: "test"
      }
    })
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })

  it("accepts pagination parameters", async function () {
    this.scope
    .get("/products.json")
    .query({ page: 2, per_page: 15 })
    .reply(200, reply)

    const response = await this.client.route("/products", { page: 2, perPage: 15 })
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Product)
  })
})

describe("/products/:id", () => {
  beforeEach(function () {
    this.scope
      .get("/products/1.json")
      .reply(200, products[0])
  })

  it("returns a product by id", async function () {
    const response = await this.client.route("/products/1")
    response.data.should.be.instanceof(Product)
  })
})
