import Collection from "./resources/Collection"
// import Resource from "./resources/Resource"

export default class ApiResponse {
  constructor(response, data) {
    this.url = response.url
    this.data = data
    if(data instanceof Collection) {
      this.pagination = data.pagination
    }
  }
}
