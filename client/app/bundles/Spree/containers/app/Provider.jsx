import React from "react"
import PropTypes from "prop-types"
import { ConnectedRouter } from "react-router-redux"
import { LocaleProvider, withContextInjector } from "app/components"
import { withStore } from "../../redux"

const Provider = ({ children, history }, { railsContext }) => (
  <LocaleProvider locale={railsContext.i18nLocale}>
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  </LocaleProvider>
)

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired
}

Provider.contextTypes = {
  railsContext: PropTypes.object.isRequired
}

export default Provider

export const withProvider = providerProps => Component => (
  withContextInjector(withStore(props => (
    <Provider {...providerProps}>
      <Component {...props} />
    </Provider>
  )))
)
