import _ from "lodash"
import { LOCATION_CHANGE } from "react-router-redux"
import { all, put, call, fork, select, takeLatest } from "redux-saga/effects"
import { hydrate } from "app/lib/hydrateStore"
import { isPageLoaded, getLocation } from "../../selectors/page"
import * as actions from "./index"

export default function create(context) {
  const { apiClient } = context

  function * request({ path, search, page, perPage }) {
    try {
      const response = yield call(apiClient.route, path, { search, page, perPage })
      if(response.isResource) {
        const collection = response.collection
        const collectionIds = {}
        Object.keys(collection).forEach((key) => {
          collectionIds[key] = collection[key].map(item => item.id)
        })
        yield put(hydrate(collection, context))
        yield put(actions.succeed(page, collectionIds, response.pagination))
      } else {
        yield put(actions.succeed(page, response.data, response.pagination))
      }
    } catch(error) {
      yield put(actions.fail(page, error))
    }
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

  // eslint-disable-next-line consistent-return
  function * load({ path, search, page, perPage }) {
    const location = yield select(getLocation)
    if(location.path === path &&
      _.isEqual(location.search, search) &&
      (!perPage || location.perPage === perPage)) {
      return fork(loadPage, { page })
    }
    yield put(actions.request(path, page, search))
    yield fork(request, { path, search, page, perPage })
  }

  function * change({ payload }) {
    const location = yield select(getLocation)
    // Fix flashing between pages by clearing loaded data when history changes
    if(payload.pathname !== location.path) {
      yield put(actions.clear())
    }
  }

  return function * watch() {
    yield all([
      takeLatest(actions.LOAD, load),
      takeLatest(actions.LOAD_PAGE, loadPage),
      takeLatest(LOCATION_CHANGE, change)
    ])
  }
}
