import Auth from "./Auth"
import Home from "./Home"
import Products from "./Products"

export default class Pages {
  constructor(api) {
    this.auth = new Auth(api)
    this.home = new Home(api)
    this.products = new Products(api)
  }

  routes() {
    return [
      ...this.auth.routes(),
      ...this.home.routes(),
      ...this.products.routes()
    ]
  }
}
