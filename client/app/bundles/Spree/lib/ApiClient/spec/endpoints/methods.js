/* eslint-env mocha */
import Collection from "../../resources/Collection"
import { pagination } from "../mock"

export const page = (Entity, resources) => function () {
  const name = Entity.collection

  beforeEach(function () {
    this.scope
      .get(Entity.href())
      .query({ page: 1 })
      .reply(200, {
        [name]: resources,
        ...pagination({ page: 1, perPage: 20, totalCount: resources.length })
      })
  })

  it(`returns a collection of ${name}`, async function () {
    const response = await this.client[name].page(1)
    response.data.should.be.instanceof(Collection)
    response.data.Entity.should.equal(Entity)
    response.pagination.should.deep.equal({
      perPage: 20,
      currentPage: 1,
      totalPages: 1,
      totalCount: resources.length
    })
  })
}

export const get = (Entity, resource) => function () {
  const name = Entity.collection
  const id = resource.id

  beforeEach(function () {
    this.scope
      .get(Entity.href(id))
      .reply(200, resource)
  })

  it(`returns an instance of ${Entity.name}`, async function () {
    const response = await this.client[name].get(id)
    response.data.should.be.instanceof(Entity)
  })
}
