import { put, call, fork, select, takeEvery } from "redux-saga/effects"
import { isProductLoaded } from "../../selectors"
import * as actions from "./index"

export default function create({ apiClient }) {
  function * request(id) {
    yield put(actions.request(id))
    const response = yield call(apiClient.products.get, id)
    if(response.error) {
      yield put(actions.fail(id, response.error))
    } else {
      yield put(actions.succeed(id, response.value))
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
