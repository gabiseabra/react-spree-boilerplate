/* eslint-env mocha */
import { Product } from "../../resources"
import { page, get } from "./methods"
import * as mock from "../mock"

const products = Array.from(Array(10), (_, i) => mock.product(i + 1))

describe("#products", () => {
  describe("#page()", page(Product, products))
  describe("#get()", get(Product, products[0]))
})
