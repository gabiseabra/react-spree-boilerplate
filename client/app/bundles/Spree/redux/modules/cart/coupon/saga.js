import { all, put, call, select, takeLatest } from "redux-saga/effects"
import { getOrder } from "../../../selectors/cart"
import { load } from "../order"
import * as actions from "./index"

export default function createSaga({ apiClient }) {
  function * apply({ code }) {
    const order = yield select(getOrder)
    if(!order) return
    yield put(actions.request())
    try {
      yield call(apiClient.orders.applyCoupon, order, { code })
      yield put(actions.succeed())
      yield put(load())
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield all([
      takeLatest(actions.APPLY, apply)
    ])
  }
}
