/* eslint-env mocha */
import { User } from "../../resources"
import AuthError from "../../AuthError"
import * as mock from "../mock"

const username = "user@example.com"
const password = "password"
const user = mock.user(1, { email: username })

describe("/login", () => {
  beforeEach(function () {
    this.scope
      .withCredentials()
      .post("/login.js")
      .reply((_, body, callback) => {
        const success = (
          body.includes(`name="spree_user[email]"\r\n\r\n${username}`) &&
          body.includes(`name="spree_user[password]"\r\n\r\n${password}`)
        )
        if(!success) {
          callback(null, [ 422, { error: "Failed to login" } ])
        } else {
          callback(null, [ 200, { user } ])
        }
      })
  })

  it("throws AuthError on invalid credentials", function () {
    return this.client.route("/login", { username, password: "wrongpass" })
      .should.eventually.be.rejectedWith(AuthError)
  })

  it("returns logged in user on success", async function () {
    const response = await this.client.route("/login", { username, password })
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
