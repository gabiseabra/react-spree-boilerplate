import { put, call, fork, select, takeEvery } from "redux-saga/effects"
import { isProductLoaded } from "../../selectors/products"
import * as actions from "./index"

export default function create({ apiClient }) {
  function * request(id) {
    yield put(actions.request(id))
    const response = yield call(apiClient.products.get, id)
    try {
      yield put(actions.succeed(id, response.toJSON()))
    } catch(error) {
      yield put(actions.fail(id, error))
    }
  }

  function * load({ id }) {
    const loaded = yield select(isProductLoaded, id)
    if(!loaded) {
      yield fork(request, id)
    }
  }

  return function * watch() {
    yield takeEvery(actions.LOAD, load)
  }
}
