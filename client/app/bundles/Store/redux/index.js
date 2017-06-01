import store from "./store"
import hydrateStore from "../../../lib/hydrateStore"
import _withStore from "../../../lib/withStore"

export const STORE_NAME = "spreeStore"

export const createStore = hydrateStore(store)

export const withStore = _withStore.bind(undefined, STORE_NAME)
