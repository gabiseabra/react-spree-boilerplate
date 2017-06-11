import Home from "./Home"
import Products from "./Products"

export default class Pages {
  constructor(api) {
    this.home = new Home(api)
    this.products = new Products(api)
  }
}
