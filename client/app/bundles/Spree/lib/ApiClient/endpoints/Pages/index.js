import Home from "./Home"
import Products from "./Products"

export default class Pages {
  constructor(api) {
    this.home = new Home(api)
    this.products = new Products(api)
  }

  get(path) {
    const { home, products } = this
    switch(path) {
      case home.path: return home
      case products.path: return products
    }
  }
}
