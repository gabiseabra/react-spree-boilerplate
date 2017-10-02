import { put, call, select, takeLatest } from "redux-saga/effects"
import { getOrder } from "../../selectors/cart"
import * as actions from "./index"

export default function createSaga({ apiClient }) {
  function * add({ variantId, quantity }) {
    yield put(actions.request())
    try {
      const response = yield call(apiClient.route, "/cart/populate", {
        variantId,
        quantity
      })
      yield put(actions.succeed(response.toJSON()))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  function * empty() {
    const order = yield select(getOrder)
    if(!order) return
    yield put(actions.request())
    try {
      yield call(apiClient.orders.empty, order)
      yield put(actions.succeed({ ...order, lineItems: [] }))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield [
      takeLatest(actions.ADD, add),
      takeLatest(actions.EMPTY, empty)
    ]
  }
}
