import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import reducer from "./reducer"

export default function create(props, railsContext) {
  console.log(props, railsContext)
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
  store.close = () => store.dispatch(END)
  if(module.hot) {
    module.hot.accept("./reducer", () => {
      store.replaceReducer(reducer)
    })
  }
  return store
}
