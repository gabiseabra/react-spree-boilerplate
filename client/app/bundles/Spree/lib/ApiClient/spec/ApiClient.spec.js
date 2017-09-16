/* eslint-env mocha */
import nock from "nock"
import ApiClient, { CSRF_TOKEN_HEADER } from "../../ApiClient"

describe("ApiClient", () => {
  let scope
  const client = new ApiClient("http://test.api", {
    csrfToken: "csrf-token"
  })

  describe("#fetch()", () => {
    beforeEach(() => {
      scope = nock("http://test.api")
      .get("/foo")
      .reply(200)
    })
    afterEach(() => scope.done())

    it("accepts a path", async () => {
      const response = await client.fetch("/foo")
      response.status.should.equal(200)
    })

    it("accepts a request object", async () => {
      const response = await client.fetch(new Request("/foo"))
      response.status.should.equal(200)
    })
  })

  describe("#json()", () => {
    beforeEach(() => {
      scope = nock("http://test.api")
        .matchHeader("Accept", "application/json")
        .get("/json")
        .reply(200, { foo: 1, bar: 2 })
    })
    afterEach(() => scope.done())

    it("requests a json page and returns it's body", () => (
      client.json("/json").should.eventually.deep.equal({ foo: 1, bar: 2 })
    ))
  })

  describe("#html()", () => {
    beforeEach(() => {
      scope = nock("http://test.api")
        .matchHeader("Accept", "text/html")
        .get("/text")
        .reply(200, "<span>Test</span>")
    })
    afterEach(() => scope.done())

    it("requests an html page and returns it's body", () => (
      client.html("/text").should.eventually.equal("<span>Test</span>")
    ))
  })

  describe("#text()", () => {
    beforeEach(() => {
      scope = nock("http://test.api")
        .matchHeader("Accept", /^text\//)
        .get("/text")
        .reply(200, "Test")
    })
    afterEach(() => scope.done())

    it("requests a text page and returns it's body", () => (
      client.text("/text").should.eventually.equal("Test")
    ))
  })

  describe("#refreshCsrfToken()", () => {
    beforeEach(() => {
      scope = nock("http://test.api")
        .matchHeader(CSRF_TOKEN_HEADER, /^csrf-token/)
        .get("/authenticity_token")
        .reply(200, {
          authenticity_token: "csrf-token-test"
        })
    })
    afterEach(() => scope.done())

    it("updates client's CSRF token", async () => {
      await client.refreshCsrfToken()
      client.headers[CSRF_TOKEN_HEADER].should.equal("csrf-token-test")
    })
  })
})
