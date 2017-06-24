import { fork } from "redux-saga/effects"
import {
  page,
  products,
  taxonomies
} from "./modules/sagas"

export default function create(context) {
  return function * root() {
    yield [
      fork(page(context)),
      fork(products(context)),
      fork(taxonomies(context))
    ]
  }
}
