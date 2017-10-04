import React from "react"
import { Navigation } from "../../../components/app"
import { UserNav, Login } from "../../auth"
import Taxonomies from "./Taxonomies"
import Language from "./Language"
import Cart from "./Cart"

const Controls = () => (
  <div>
    <UserNav>
      <Login />
    </UserNav>
    <Language />
    <Cart />
  </div>
)

const NavigationApp = () => (
  <Navigation right={<Controls />}>
    <Taxonomies />
  </Navigation>
)

export default NavigationApp
