import ReactOnRails from "react-on-rails"
import createStore from "./store"
import _withStore from "../../../lib/withStore"

export const STORE_NAME = "spreeStore"

export const registerStore = () => ReactOnRails.registerStore({ [STORE_NAME]: createStore })

export const withStore = _withStore.bind(undefined, STORE_NAME)
