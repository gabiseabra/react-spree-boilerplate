import { fork } from "redux-saga/effects"
import {
  auth,
  cart,
  page,
  products
} from "./modules/sagas"

export default function create(context) {
  return function * root() {
    yield [
      fork(auth(context)),
      fork(cart(context)),
      fork(page(context)),
      fork(products(context))
    ]
  }
}
