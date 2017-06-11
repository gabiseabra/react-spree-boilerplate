import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createSaga from "./saga"
import reducer from "./reducer"

export default function create(context) {
  const saga = createSaga(context)
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = []
  const middleware = [ sagaMiddleware ]
  if(process.env.NODE_ENV === "development") {
    /* eslint-disable no-underscore-dangle */
    if(window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())
    }
    /* eslint-enable */
  }
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )(createStore)
  const store = finalCreateStore(reducer)
  store.runSaga = sagaMiddleware.run
  store.task = store.runSaga(saga)
  store.close = () => store.dispatch(END)
  if(module.hot) {
    module.hot.accept("./reducer", () => {
      store.replaceReducer(reducer)
    })
    module.hot.accept("./saga", () => {
      store.task.cancel()
      store.task = store.runSaga(createSaga(context))
    })
  }
  return store
}
