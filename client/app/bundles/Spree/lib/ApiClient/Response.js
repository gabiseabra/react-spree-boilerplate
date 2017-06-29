import _ from "lodash"
import ResponseData from "./ResponseData"

const parseAny = (Entity, data) => (
  _.isArray(data) ?
  data.map(v => new Entity(v)) :
  new Entity(data)
)

// Response parser
export default class ApiResponse {
  constructor(response, options) {
    this.options = options
    this.response = response
  }

  async json() {
    const { collection, Entity } = this.options
    const data = await this.response.json()
    let value = data
    if(collection) value = data[collection]
    if(Entity) value = parseAny(Entity, value)
    return new ResponseData.Json({
      response: this.response,
      Entity,
      data,
      value
    })
  }

  async html() {
    return new ResponseData({
      response: this.response,
      data: (await this.response.html())
    })
  }

  async text() {
    return new ResponseData({
      response: this.response,
      data: (await this.response.text())
    })
  }
}
