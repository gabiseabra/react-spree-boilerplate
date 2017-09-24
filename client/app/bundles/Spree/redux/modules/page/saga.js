import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import { hydrate } from "app/lib/hydrateStore"
import { isPageLoaded, getLocation } from "../../selectors"
import * as actions from "./index"

export default function create(context) {
  const { apiClient } = context

  function * request({ path, search, page, perPage }) {
    try {
      const response = yield call(apiClient.route, path, { search, page, perPage })
      const pagination = response.pagination
      if(response.isResource) {
        const collection = response.collection
        const collectionIds = {}
        Object.keys(collection).forEach((key) => {
          collectionIds[key] = collection[key].map(item => item.id)
        })
        yield put(hydrate(collection, context))
        yield put(actions.succeed(page, collectionIds, pagination))
      } else {
        yield put(actions.succeed(page, response.data, pagination))
      }
    } catch(error) {
      yield put(actions.fail(page, error))
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
