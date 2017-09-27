/* eslint-env mocha */
import { LineItem } from "../../resources"
import * as mock from "../mock"

const order = "ORDERNUM001"

const item = mock.lineItem(1, { variantId: 1, quantity: 1 })

describe("#lineItems", () => {
  describe("#post()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .post(`/api/v1/orders/${order}/line_items`)
        .query({
          line_item: {
            variant_id: 1,
            quantity: 1
          }
        })
        .reply(201, item)
    })

    it("creates a new line item", async function () {
      const response = await this.client.lineItems.post(order, { variantId: 1, quantity: 1 })
      response.data.should.be.instanceof(LineItem)
    })
  })

  describe("#put()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .put(`/api/v1/orders/${order}/line_items/${item.id}`)
        .query({
          line_item: {
            quantity: 2
          }
        })
        .reply(200, item)
    })

    it("returns a line item's data updated ", async function () {
      const response = await this.client.lineItems.put(order, item.id, { quantity: 2 })
      response.data.should.be.instanceof(LineItem)
    })
  })

  describe("#delete()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .delete(`/api/v1/orders/${order}/line_items/${item.id}`)
        .reply(204)
    })

    it("deletes a line item", function () {
      this.client.lineItems.delete(order, item.id).should.eventually.be.ok
    })
  })
})
