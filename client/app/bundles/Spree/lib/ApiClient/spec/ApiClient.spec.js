/* eslint-env mocha */
import nock from "nock"
import ApiClient, { CSRF_TOKEN_HEADER } from "../../ApiClient"

describe("ApiClient", () => {
  const client = new ApiClient("http://test.api", {
    csrfToken: "csrf-token"
  })
  beforeEach("setup nock scope", function () {
    this.client = client
    this.scope = nock("http://test.api")
    this.scope.withCredentials = token => this.scope.matchHeader(CSRF_TOKEN_HEADER, token || /.+/)
  })
  afterEach("finish nock scope", function () {
    this.scope.done()
  })

  describe("#fetch()", () => {
    beforeEach(function () {
      this.scope
        .get("/foo")
        .reply(200)
    })

    it("accepts a path", async function () {
      const response = await this.client.fetch("/foo")
      response.status.should.equal(200)
    })

    it("accepts a request object", async function () {
      const response = await this.client.fetch(new Request("/foo"))
      response.status.should.equal(200)
    })
  })

  describe("#json()", () => {
    beforeEach(function () {
      this.scope
        .matchHeader("Accept", "application/json")
        .get("/json")
        .reply(200, { foo: 1, bar: 2 })
    })

    it("requests a json page and returns it's body", function () {
      return this.client.json("/json").should.eventually.deep.equal({ foo: 1, bar: 2 })
    })
  })

  describe("#html()", () => {
    beforeEach(function () {
      this.scope
        .matchHeader("Accept", "text/html")
        .get("/text")
        .reply(200, "<span>Test</span>")
    })

    it("requests an html page and returns it's body", function () {
      return this.client.html("/text").should.eventually.equal("<span>Test</span>")
    })
  })

  describe("#text()", () => {
    beforeEach(function () {
      this.scope
        .matchHeader("Accept", /^text\//)
        .get("/text")
        .reply(200, "Test")
    })

    it("requests a text page and returns it's body", function () {
      return this.client.text("/text").should.eventually.equal("Test")
    })
  })

  describe("#refreshCsrfToken()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .get("/authenticity_token")
        .reply(200, {
          authenticity_token: "csrf-token-test"
        })
    })

    it("updates client's CSRF token", async function () {
      await this.client.refreshCsrfToken()
      this.client.headers[CSRF_TOKEN_HEADER].should.equal("csrf-token-test")
    })
  })

  describe("#route()", () => {
    require("./routes/home")
    require("./routes/auth")
    require("./routes/products")
  })

  require("./endpoints/taxons")
  require("./endpoints/taxonomies")
  require("./endpoints/products")
})
