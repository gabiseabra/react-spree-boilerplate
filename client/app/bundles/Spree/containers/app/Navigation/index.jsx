import React from "react"
import { Navigation } from "../../../components/app"
import { UserNav, Login } from "../../auth"
import Taxonomies from "./Taxonomies"
import Language from "./Language"

const Controls = () => (
  <div>
    <UserNav>
      <Login />
    </UserNav>
    <Language />
  </div>
)

const NavigationApp = () => (
  <Navigation controls={<Controls />}>
    <Taxonomies />
  </Navigation>
)

export default NavigationApp
