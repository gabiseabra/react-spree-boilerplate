import React, { Component } from "react"
import PropTypes from "prop-types"
import { Route as BaseRoute, Switch } from "react-router-dom"
import { Helmet } from "react-helmet"
import HomePage from "./HomePage"
import ProductsPage from "./ProductsPage"
import ShowProductPage from "./ShowProductPage"
import ShowTaxonPage from "./ShowTaxonPage"
import CartPage from "./CartPage"

// Modified react-router Route component that notifies parent on match.
class Route extends BaseRoute {
  static contextTypes = {
    ...(BaseRoute.contextTypes || {}),
    onMatchRoute: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.context.onMatchRoute(this)
    return super.componentWillMount()
  }
}

// Rails is supposed to render both react components and the controller's view,
// so when a requested page does not have a corresponding react route, the
// default view is displayed as a fallback. The main routes component needs to
// know when there is a match to clean the rails view html.
// This ensures react-router's Link changes the content to the matching route
// even when a rails view is rendered first.
export default class App extends Component {
  static childContextTypes = {
    onMatchRoute: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      onMatchRoute: this.onMatch
    }
  }

  onMatch = () => {
    const element = document.getElementById("rails-root")
    if(element) element.remove()
  }

  render() {
    return (
      <div>
        <Helmet
          defaultTitle="React Spree Boilerplate"
          titleTemplate="%s - React Spree Boilerplate" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:id" component={ShowProductPage} />
          <Route exact path="/t/:id*" component={ShowTaxonPage} />
          <Route exact path="/cart" component={CartPage} />
        </Switch>
      </div>
    )
  }
}
