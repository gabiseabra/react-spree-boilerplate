import home from "./home"
import auth from "./auth"
import products from "./products"
import taxons from "./taxons"

export default {
  ...home,
  ...auth,
  ...products,
  ...taxons
}
