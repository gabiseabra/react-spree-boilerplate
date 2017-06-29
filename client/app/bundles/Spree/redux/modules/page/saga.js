import _ from "lodash"
import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import { hydrate } from "app/lib/hydrateStore"
import { isPageLoaded, getLocation } from "../../selectors"
import * as actions from "./index"

export default function create(context) {
  const { apiClient } = context

  function * request({ path, search, page, perPage }) {
    const response = yield call(apiClient.route, path, { search, page, perPage })
    const { value, error, pagination, collection } = response
    if(error) {
      yield put(actions.fail(page, error, pagination))
    } else if(!collection) {
      yield put(actions.succeed(page, value, pagination))
    } else {
      const idArray = _.isArray(value) ? value.map(o => o.id) : value.id
      yield put(hydrate({ [collection]: _.flatten([ value ]) }, context))
      yield put(actions.succeed(page, idArray, pagination))
    }
  }

  function * load({ path, search, page, perPage }) {
    yield put(actions.request(path, search, page))
    yield fork(request, { path, search, page, perPage })
  }

  function * loadPage({ page: requestedPage }) {
    const page = parseInt(requestedPage, 10)
    const loaded = yield select(isPageLoaded, { page })
    const location = yield select(getLocation)
    const perPage = (location.pagination && location.pagination.perPage) || undefined
    if(!isNaN(page) && page >= 1 && !loaded) {
      yield put(actions.requestPage(page))
      yield fork(request, {
        page,
        perPage,
        path: location.path,
        search: location.search
      })
    }
  }

  return function * watch() {
    yield [
      takeLatest(actions.LOAD, load),
      takeLatest(actions.LOAD_PAGE, loadPage)
    ]
  }
}
