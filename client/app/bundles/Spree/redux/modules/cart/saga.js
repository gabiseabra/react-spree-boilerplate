import { all, fork } from "redux-saga/effects"
import order from "./order/saga"
import coupon from "./coupon/saga"

export default function createSaga(context) {
  return function * watch() {
    yield all([
      fork(order(context)),
      fork(coupon(context))
    ])
  }
}
