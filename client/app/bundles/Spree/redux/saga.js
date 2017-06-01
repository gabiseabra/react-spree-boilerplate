import { fork } from "redux-saga/effects"
import { counter } from "./modules/sagas"

export default function create() {
  return function * root() {
    yield [ fork(counter) ]
  }
}
