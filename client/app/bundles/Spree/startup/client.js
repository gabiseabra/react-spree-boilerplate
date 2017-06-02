import ReactOnRails from "react-on-rails"
import { Header, Footer, HomePage } from "../components"
import { createStore, STORE_NAME } from "../redux"

ReactOnRails.register({
  Header,
  Footer,
  HomePage
})

ReactOnRails.registerStore({ [STORE_NAME]: createStore })
