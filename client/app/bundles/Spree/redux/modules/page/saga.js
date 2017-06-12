import { hydrate } from "../../../../../lib/hydrateStore"
import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import { isPageLoaded, getPagination, getLocation } from "../../selectors"
import * as actions from "./index"

export default function create(context) {
  const { apiClient } = context
  const sagaContext = { ...context, sagaContext: true }

  function * request({ location, query, page }) {
    const response = yield call(apiClient.route, location, query)
    if(response.error) {
      yield put(actions.fail(page, response.error))
    } else {
      const { data, collection, pagination } = response
      if(!collection) {
        yield put(actions.succeed(page, data))
      } else if(!pagination) {
        yield put(hydrate({ [collection]: [ data ] }, sagaContext))
        yield put(actions.succeed(page, data.id))
      } else {
        yield put(hydrate({ [collection]: data }, sagaContext))
        yield put(actions.succeed(page, data.map(entry => entry.id), pagination))
      }
    }
  }

  function * load({ location, page, query }) {
    yield put(actions.request(location))
    yield fork(request, { location, query, page })
  }

  function * loadPage({ page: requestedPage }) {
    const page = parseInt(requestedPage)
    const loaded = yield select(isPageLoaded, page)
    const location = yield select(getLocation)
    const pagination = yield select(getPagination)
    if(!isNaN(page) && page >= 1 && !loaded) {
      yield put(actions.request(location, page))
      yield fork(request, {
        page,
        location,
        query: pagination.pageQuery(page)
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
