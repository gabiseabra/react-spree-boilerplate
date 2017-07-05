import React from "react"
import { Header } from "../../components/views"
import { Navigation, withProvider } from "../app"

const HeaderApp = () => (
  <Header navigation={<Navigation />} />
)

export default withProvider(HeaderApp)
