import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import { isTaxonomiesLoaded } from "../../selectors/taxonomies"
import * as actions from "./index"

export default function create({ apiClient }) {
  function * request() {
    yield put(actions.request())
    const response = yield call(apiClient.taxonomies.getAll, { nested: true })
    if(response.error) {
      yield put(actions.fail(response.error))
    } else {
      yield put(actions.succeed(response.value))
    }
  }

  function * load() {
    const loaded = yield select(isTaxonomiesLoaded)
    if(!loaded) {
      yield fork(request)
    }
  }

  return function * watch() {
    yield takeLatest(actions.LOAD, load)
  }
}
