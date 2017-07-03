import Home from "./Home"
import Products from "./Products"
import Session from "./Session"

export default class Pages {
  constructor(api) {
    this.home = new Home(api)
    this.products = new Products(api)
    this.session = new Session(api)
  }

  routes() {
    return [
      ...this.home.routes(),
      ...this.products.routes(),
      ...this.session.routes()
    ]
  }
}
