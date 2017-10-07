import React from "react"
import { Route, Switch } from "react-router-dom"
import { Helmet } from "react-helmet"
import HomePage from "./HomePage"
import ProductsPage from "./ProductsPage"
import ShowProductPage from "./ShowProductPage"
import ShowTaxonPage from "./ShowTaxonPage"

const App = () => (
  <div>
    <Helmet
      defaultTitle="React Spree Boilerplate"
      titleTemplate="%s - React Spree Boilerplate" />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/products" component={ProductsPage} />
      <Route exact path="/products/:id" component={ShowProductPage} />
      <Route exact path="/t/:id*" component={ShowTaxonPage} />
    </Switch>
  </div>
)

export default App
