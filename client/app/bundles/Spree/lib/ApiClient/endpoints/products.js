import { Product } from "../resources"
import * as methods from "./methods"

export const page = methods.page(Product, {
  href: "/api/v1/products",
  collection: "products"
})

export const get = methods.get(Product, {
  href: id => `/api/v1/products/${id}`
})
