import React from "react"
import PropTypes from "prop-types"
import { LocaleProvider, withContextInjector } from "app/components"
import { withStore } from "../../redux"

const Provider = ({ children }, { railsContext }) => (
  <LocaleProvider locale={railsContext.i18nLocale}>
    {children}
  </LocaleProvider>
)

Provider.propTypes = {
  children: PropTypes.node.isRequired
}

Provider.contextTypes = {
  railsContext: PropTypes.object.isRequired
}

export default Provider

export const withProvider = Component => withContextInjector(withStore(props => (
  <Provider>
    <Component {...props} />
  </Provider>
)))
