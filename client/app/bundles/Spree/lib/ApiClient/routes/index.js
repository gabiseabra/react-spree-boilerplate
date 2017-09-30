// eslint-disable-next-line import/extensions
import Router from "universal-router"
import home from "./home"
import auth from "./auth"
import products from "./products"
import taxons from "./taxons"
import cart from "./cart"

const routes = {
  ...home,
  ...auth,
  ...products,
  ...taxons,
  ...cart
}

export default function createRouter(api) {
  const finalRoutes = Object.keys(routes).map(path => ({
    path,
    action: routes[path].bind(api)
  }))
  return new Router(finalRoutes, {
    context: { api }
  })
}
