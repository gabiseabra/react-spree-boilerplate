import React from "react"
import PropTypes from "prop-types"
import { IntlProvider } from "react-intl"
import { defaultLocale } from "../locales/default"
import { translations } from "../locales/translations"
import "../locales"

const LocaleProvider = ({ children, locale }) => (
  <IntlProvider locale={locale} messages={translations[locale]}>
    {children}
  </IntlProvider>
)

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired
}

LocaleProvider.defaultProps = {
  locale: defaultLocale
}

export default LocaleProvider
