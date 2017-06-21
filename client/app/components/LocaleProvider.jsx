import React from "react"
import PropTypes from "prop-types"
import { IntlProvider } from "react-intl"
import { LocaleProvider as AntProvider } from "antd"
import { defaultLocale } from "../locales/default"
import { translations as railsTranslations } from "../locales/translations"
import antdTranslations from "../locales/antd"

const LocaleProvider = ({ children, locale }) => (
  <AntProvider locale={antdTranslations[locale]}>
    <IntlProvider locale={locale} messages={railsTranslations[locale]}>
      {children}
    </IntlProvider>
  </AntProvider>
)

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired
}

LocaleProvider.defaultProps = {
  locale: defaultLocale
}

export default LocaleProvider
