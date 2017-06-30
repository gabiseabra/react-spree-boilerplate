import { put, call, select, takeLatest } from "redux-saga/effects"
import { isUserLoggedIn } from "../../selectors"
import * as actions from "./index"

export default function create({ apiClient }) {
  function * login(data) {
    const loggedIn = yield select(isUserLoggedIn)
    if(loggedIn) return
    yield put(actions.request())
    try {
      const user = yield call(apiClient.route, "/login", data)
      if(user.error) {
        throw new Error(user.error)
      }
      yield put(actions.succeed(user))
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
      yield put(actions.succeed(undefined))
    } catch(error) {
      yield put(actions.fail(error))
    }
  }

  return function * watch() {
    yield [
      takeLatest(actions.LOGIN, login),
      takeLatest(actions.LOGOUT, logout)
    ]
  }
}
