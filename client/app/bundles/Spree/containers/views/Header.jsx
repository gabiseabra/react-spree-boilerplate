import React from "react"
import { Header } from "../../components/views"
import { Navigation, withProvider } from "../app"

const HeaderApp = () => (
  <Header>
    <Header.Brand />
    <Header.Navigation>
      <Navigation />
    </Header.Navigation>
  </Header>
)

export default withProvider(HeaderApp)
