import ReactOnRails from "react-on-rails"
import * as containers from "../containers"
import { createStore, STORE_NAME } from "../redux"

ReactOnRails.register(containers)

ReactOnRails.registerStore({ [STORE_NAME]: createStore })