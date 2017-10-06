import React from "react"
import { Route, Switch } from "react-router-dom"
import {
  HomePage,
  ProductsPage,
  ShowProductPage,
  ShowTaxonPage
} from "../page"

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/products" component={ProductsPage} />
    <Route exact path="/products/:id" component={ShowProductPage} />
    <Route exact path="/t/:id*" component={ShowTaxonPage} />
  </Switch>
)

export default App
