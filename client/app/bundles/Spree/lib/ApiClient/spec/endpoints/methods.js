/* eslint-env mocha */
import Collection from "../../resources/Collection"

export const page = (Entity, resources) => function () {
  const name = Entity.collection

  beforeEach(function () {
    this.scope
      .get(Entity.href())
      .query({ page: 1 })
      .reply(200, {
        [name]: resources,
        per_page: 20,
        current_page: 1,
        total_pages: 1,
        total_count: resources.length
      })
  })

  it(`returns a collection of ${name}`, async function () {
    const collection = await this.client[name].page(1)
    collection.should.be.instanceof(Collection)
    collection.Entity.should.equal(Entity)
    collection.pagination.should.deep.equal({
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

  it(`returns an instance of ${Entity.name}`, function () {
    return this.client[name].get(id).should.eventually.be.instanceof(Entity)
  })
}
