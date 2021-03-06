import { all, put, fork, call, select, takeLatest } from "redux-saga/effects"
import { getOrder } from "../../../selectors/cart"
import * as actions from "./index"
import * as auth from "../../auth"

export default function createSaga({ apiClient }) {
  function * load() {
    yield put(actions.request())
    try {
      const response = yield call(apiClient.route, "/cart")
      yield put(actions.succeed(response.toJSON()))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

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
      yield fork(load)
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  function * edit({ lineItemId, quantity }) {
    const order = yield select(getOrder)
    if(!order) return
    if(quantity === 0) {
      yield fork(remove, { lineItemId })
      return
    }
    yield put(actions.request())
    try {
      yield call(apiClient.lineItems.put, order, lineItemId, { quantity })
      yield fork(load)
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
      takeLatest(actions.LOAD, load),
      takeLatest(auth.SUCCESS, load),
      takeLatest(actions.ADD, add),
      takeLatest(actions.EDIT, edit),
      takeLatest(actions.REMOVE, remove),
      takeLatest(actions.EMPTY, empty)
    ])
  }
}
