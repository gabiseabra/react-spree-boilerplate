import ReactOnRails from "react-on-rails"
import { Header, Footer } from "../components"
import { registerStore } from "../redux"

ReactOnRails.register({
  Header,
  Footer
})

registerStore()
