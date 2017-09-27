/* eslint-env mocha */
import { Order } from "../../resources"
import { get } from "./methods"
import * as mock from "../mock"

const lineItems = {
  1: { quantity: 1 },
  2: { quantity: 1 },
  3: { quantity: 5 }
}

const order = mock.order(1, { lineItems })

describe("#orders", () => {
  describe("#get()", get(Order, order))

  describe("#post()", () => {
    beforeEach(function () {
      this.scope
        .post("/api/v1/orders")
        .reply(201, order)
    })

    it("creates a new order", async function () {
      const response = await this.client.orders.post({ lineItems })
      response.data.should.be.instanceof(Order)
    })
  })

  describe("#empty()", () => {
    beforeEach(function () {
      this.scope
        .put(`/api/v1/orders/${order.number}/empty`)
        .reply(200)
    })

    it("empties an order's line items", function () {
      this.client.orders.empty(order.number).should.eventually.be.ok
    })
  })
})
