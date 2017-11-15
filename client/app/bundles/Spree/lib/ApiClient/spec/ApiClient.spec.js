/* eslint-env mocha */
import nock from "nock"
import ApiClient, { CSRF_TOKEN_HEADER } from "../../ApiClient"
import ApiResponse from "../Response"
import * as mock from "./mock"

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

  describe("#request()", () => {
    it("accepts a path", function () {
      this.client.request("/foo").should.be.instanceof(Request)
    })

    it("accepts a request object", function () {
      this.client.request(new Request("/foo")).should.be.instanceof(Request)
    })

    it("adds csrf headers", function () {
      this.client.request("/foo").headers.has(CSRF_TOKEN_HEADER).should.eql(true)
    })

    it("omits csrf headers", function () {
      this.client.request("/foo", { credentials: "omit" }).headers.has(CSRF_TOKEN_HEADER).should.eql(false)
    })

    context("with format option", () => {
      it("appends format extension to path", function () {
        this.client.request("/", { format: "json" }).path.should.eql("/index.json")
        this.client.request("/foo", { format: "json" }).path.should.eql("/foo.json")
        this.client.request("/foo?test=true", { format: "json" }).path.should.eql("/foo.json?test=true")
      })

      it("doesn't change path with extension", function () {
        this.client.request("/foo.json", { format: "json" }).path.should.eql("/foo.json")
        this.client.request("/foo.txt", { format: "json" }).path.should.eql("/foo.txt")
      })
    })
  })

  describe("#fetch()", () => {
    beforeEach(function () {
      this.scope
        .get("/foo")
        .reply(200)
    })

    it("sends a request", async function () {
      const response = await this.client.fetch("/foo")
      response.status.should.equal(200)
    })
  })

  describe("#json()", () => {
    beforeEach(function () {
      this.scope
        .matchHeader("Accept", "application/json")
        .get("/json.json")
        .reply(200, { foo: 1, bar: 2 })
    })

    it("requests a json page and returns it's body", async function () {
      const response = await this.client.json("/json")
      response.should.be.instanceof(ApiResponse)
      response.data.should.deep.equal({ foo: 1, bar: 2 })
    })
  })

  describe("#html()", () => {
    beforeEach(function () {
      this.scope
        .matchHeader("Accept", "text/html")
        .get("/html")
        .reply(200, "<span>Test</span>")
    })

    it("requests an html page and returns it's body", async function () {
      const response = await this.client.html("/html")
      response.should.be.instanceof(ApiResponse)
      response.data.should.equal("<span>Test</span>")
    })
  })

  describe("#refreshCsrfToken()", () => {
    beforeEach(function () {
      this.scope
        .withCredentials()
        .get("/authenticity_token.json")
        .reply(200, {
          authenticity_token: "csrf-token-test"
        })
    })

    it("updates client's CSRF token", async function () {
      await this.client.refreshCsrfToken()
      this.client.headers[CSRF_TOKEN_HEADER].should.equal("csrf-token-test")
    })
  })

  describe("#hydrate()", () => {
    it("returns instantiated server data", function () {
      this.client.hydrate({
        products: [ mock.product(1), mock.product(2) ]
      }).products.should.be.an("array").and.all.include.keys("id", "master")
    })

    it("keeps unknown properties", function () {
      this.client.hydrate({
        test: { foo: 1, bar: 2 },
        pagination: mock.pagination({ page: 1, perPage: 20 })
      }).should.deep.equal({
        test: { foo: 1, bar: 2 },
        pagination: {
          perPage: 20,
          currentPage: 1,
          totalPages: 1,
          totalCount: 0
        }
      })
    })
  })

  describe("#route()", () => {
    require("./routes/home")
    require("./routes/auth")
    require("./routes/products")
    require("./routes/taxons")
  })

  require("./endpoints/products")
  require("./endpoints/orders")
  require("./endpoints/lineItems")
})
