import { all, put, call, select, takeLatest } from "redux-saga/effects"
import { isUserLoggedIn } from "../../selectors/auth"
import * as actions from "./index"

export default function create({ apiClient }) {
  function * refreshToken() {
    try {
      yield call(apiClient.refreshCsfrToken)
      yield put(actions.updateToken(apiClient.csrfToken))
    } catch(_) { /* ... */ }
  }

  function * login({ data }) {
    const loggedIn = yield select(isUserLoggedIn)
    if(loggedIn) return
    yield put(actions.request())
    try {
      const response = yield call(apiClient.route, "/login", data)
      yield put(actions.updateToken(apiClient.csrfToken))
      yield put(actions.succeed(response.toJSON()))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  function * logout() {
    const loggedIn = yield select(isUserLoggedIn)
    if(!loggedIn) return
    yield put(actions.request())
    try {
      yield call(apiClient.route, "/logout")
      yield put(actions.updateToken(apiClient.csrfToken))
      yield put(actions.succeed(undefined))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield all([
      takeLatest(actions.LOGIN, login),
      takeLatest(actions.LOGOUT, logout),
      takeLatest(actions.REFRESH_TOKEN, refreshToken)
    ])
  }
}
