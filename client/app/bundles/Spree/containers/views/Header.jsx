import React from "react"
import { Header } from "../../components/views"
import { Navigation } from "../app"

const HeaderApp = () => (
  <Header>
    <Header.Brand />
    <Header.Navigation>
      <Navigation />
    </Header.Navigation>
  </Header>
)

export default HeaderApp
