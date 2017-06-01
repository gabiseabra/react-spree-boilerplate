import ReactOnRails from "react-on-rails"
import { Header, Footer } from "../components"
import { createStore, STORE_NAME } from "../redux"

ReactOnRails.register({
  Header,
  Footer
})

ReactOnRails.registerStore({ [STORE_NAME]: createStore })
