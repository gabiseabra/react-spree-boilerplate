import { all, put, fork, call, select, takeLatest } from "redux-saga/effects"
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

  function * remove({ lineItemId }) {
    const order = yield select(getOrder)
    if(!order) return
    yield put(actions.request())
    try {
      yield call(apiClient.lineItems.del, order, lineItemId)
      const response = yield call(apiClient.route, "/cart")
      yield put(actions.succeed(response.toJSON()))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  function * edit({ lineItemId, quantity }) {
    const order = yield select(getOrder)
    if(!order) return
    if(quantity === 0) return fork(remove, { lineItemId })
    yield put(actions.request())
    try {
      yield call(apiClient.lineItems.put, order, lineItemId, { quantity })
      const response = yield call(apiClient.route, "/cart")
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
      yield put(actions.succeed({
        ...order,
        quantity: 0,
        price: {
          total: 0.0,
          items: 0.0,
          tax: 0.0,
          shipping: 0.0,
          adjustment: 0.0
        },
        lineItems: []
      }))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield all([
      takeLatest(actions.ADD, add),
      takeLatest(actions.EDIT, edit),
      takeLatest(actions.REMOVE, remove),
      takeLatest(actions.EMPTY, empty)
    ])
  }
}
