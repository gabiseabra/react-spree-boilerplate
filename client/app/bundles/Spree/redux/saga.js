import { fork } from "redux-saga/effects"
import {
  products,
  page
} from "./modules/sagas"

export default function create(context) {
  return function * root() {
    yield [
      fork(products(context)),
      fork(page(context))
    ]
  }
}
