/* eslint-env mocha */
// import { Order } from "../../resources"
import * as mock from "../mock"

const lineItems = [
  { variantId: 1, quantity: 1 },
  { variantId: 2, quantity: 1 },
  { variantId: 3, quantity: 5 }
]

const order = mock.order(1, { lineItems })

describe("#orders", () => {
  beforeEach(function () {
    this.scope.matchHeader("X-Spree-Order-Token", order.token)
  })

  describe("#empty()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .put(`/api/v1/orders/${order.number}/empty`)
        .reply(200)
    })

    it("empties an order's line items", function () {
      this.client.orders.empty(order).should.eventually.be.ok
    })
  })
})
