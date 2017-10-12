import { all, put, call, takeLatest } from "redux-saga/effects"
import * as actions from "./states"

export default function createSaga({ apiClient }) {
  function * load({ country }) {
    yield put(actions.request(country))
    try {
      const response = yield call(apiClient.states.getAll, country)
      yield put(actions.succeed(country, response.toJSON().data))
    } catch(error) {
      yield put(actions.fail(country, error))
    }
  }

  return function * watch() {
    yield all([
      takeLatest(actions.LOAD, load)
    ])
  }
}
