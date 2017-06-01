import { delay } from "redux-saga"
import { put, takeLatest } from "redux-saga/effects"
import {
  INCREMENT_ASYNC,
  DECREMENT_ASYNC,
  increment,
  decrement
} from "./index"

const WAIT = 1000

function * counterFn(actionCreator) {
  yield delay(WAIT)
  yield put(actionCreator(true))
}

export default function * watch() {
  yield [
    takeLatest(INCREMENT_ASYNC, counterFn.bind(undefined, increment)),
    takeLatest(DECREMENT_ASYNC, counterFn.bind(undefined, decrement))
  ]
}
