import ReactOnRails from "react-on-rails"
import createStore from "./store"

export const STORE_NAME = "spreeStore"

export const registerStore = () => ReactOnRails.registerStore({ [STORE_NAME]: createStore })

// export const withStore = (component) => ()
