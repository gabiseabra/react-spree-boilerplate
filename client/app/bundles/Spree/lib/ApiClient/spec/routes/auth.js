/* eslint-env mocha */
import { User } from "../../resources"
import ResponseError from "../../ResponseError"
import * as mock from "../mock"

const login = "user@example.com"
const password = "password"
const user = mock.user(1, { email: login })

describe("/login", () => {
  beforeEach(function () {
    this.scope
      .withCredentials()
      .post("/login.js")
      .reply((_, body, callback) => {
        const success = (
          body.includes(`name="spree_user[email]"\r\n\r\n${login}`) &&
          body.includes(`name="spree_user[password]"\r\n\r\n${password}`)
        )
        if(!success) {
          callback(null, [ 422, { error: "Failed to login" } ])
        } else {
          callback(null, [ 200, { user } ])
        }
      })
  })

  it("throws ResponseError on invalid credentials", function () {
    return this.client.route("/login", { login, password: "wrongpass" })
      .should.eventually.be.rejectedWith(ResponseError)
  })

  it("returns logged in user on success", async function () {
    const response = await this.client.route("/login", { login, password })
    response.data.should.be.instanceof(User)
  })
})

describe("/logout", () => {
  beforeEach(function () {
    this.scope
      .withCredentials()
      .get("/logout")
      .reply(200)
      .get("/authenticity_token")
      .reply(200, {
        authenticity_token: "foo"
      })
  })

  it("logs out and updates csrf token", function () {
    // eslint-disable-next-line no-unused-expressions
    this.client.route("/logout").should.eventually.be.ok
  })
})
