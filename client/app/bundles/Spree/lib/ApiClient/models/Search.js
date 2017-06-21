import _ from "lodash"
import qs from "querystring"

export default class Search {
  constructor(search) {
    this.query = (_.isString(search) ? qs.parse(search) : search)
    this.params = {}
    _.keys(this.query).forEach((key) => {
      const match = key.match(/^q\[([^\]]+)\]$/)
      if(match) {
        this.params[match[1]] = this.query[key]
      } else {
        delete this.query[key]
      }
    })
  }
}
