import ReactOnRails from "react-on-rails"
import * as containers from "../containers/views"
import { createStore, STORE_NAME } from "../redux"

window.Spree = {}

ReactOnRails.register(containers)

ReactOnRails.registerStore({ [STORE_NAME]: createStore })
