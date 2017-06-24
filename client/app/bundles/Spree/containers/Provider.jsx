import React from "react"
import PropTypes from "prop-types"
import { withStore } from "../redux"
import { LocaleProvider, withContext } from "../../../components"

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

export const withProvider = Component => withContext(withStore(props => (
  <Provider>
    <Component {...props} />
  </Provider>
)))
