import { put, fork, call, select, takeLatest } from "redux-saga/effects"
import { getOrder } from "../../selectors/cart"
import * as actions from "./index"

export default function createSaga({ apiClient }) {
  function * create({ variantId, quantity }) {
    const order = yield select(getOrder)
    if(order) return fork(add, { variantId, quantity })
    yield put(actions.request())
    try {
      const response = yield call(apiClient.orders.post, {
        lineItems: (variantId ? {
          [variantId]: { quantity }
        } : undefined)
      })
      yield put(actions.succeed(response.data))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  function * add({ variantId, quantity }) {
    // ...
  }

  function * empty() {
    const order = yield select(getOrder)
    if(!order) return
    yield put(actions.request())
    try {
      const response = yield call(apiClient.orders.empty, order.number)
      yield put(actions.succeed(response.data))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield [
      takeLatest(actions.CREATE, create),
      takeLatest(actions.EMPTY, empty)
    ]
  }
}
