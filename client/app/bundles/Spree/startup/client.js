import _ from "lodash"
import ReactOnRails from "react-on-rails"
import { createBrowserHistory } from "history"
import { withProvider } from "../containers/app"
import * as containers from "../containers/views"
import { createStore, STORE_NAME } from "../redux"

window.Spree = {}

const history = createBrowserHistory()

const connect = Component => withProvider({ history })(Component)

const connectedContainers = _.mapValues(containers, connect)

ReactOnRails.register(connectedContainers)

ReactOnRails.registerStore({ [STORE_NAME]: createStore({ history }) })
