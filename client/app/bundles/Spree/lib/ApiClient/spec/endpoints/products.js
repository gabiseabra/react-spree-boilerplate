/* eslint-env mocha */
import { Product, Collection } from "../../resources"
import * as mock from "../mock"

const subject = mock.product(1, {
  slug: "test",
  name: "test product"
})

describe("#products", () => {
  describe("#page()", () => {
    beforeEach(function () {
      this.scope
        .get("/api/v1/products")
        .query({ page: 1 })
        .reply(200, {
          products: [ subject ],
          current_page: 1
        })
    })

    it("returns an array of products", async function () {
      const response = await this.client.products.page(1)
      response.data.should.be.instanceof(Collection)
      response.data.Entity.should.equal(Product)
    })
  })

  describe("#get()", () => {
    beforeEach(function () {
      this.scope
        .get(`/api/v1/products/${subject.id}`)
        .reply(200, subject)
    })

    it("returns a product", async function () {
      const response = await this.client.products.get(subject.id)
      response.data.should.be.instanceof(Product)
    })
  })
})
