import React, { Component } from "react"
import PropTypes from "prop-types"
import { withContext } from "app/components"
import { SelectLanguage } from "../../components/app"

class SelectLanguageApp extends Component {
  static propTypes = {
    railsContext: PropTypes.object.isRequired
  }

  onChangeLocale = (locale) => {
    window.location.href = `/locale/set?locale=${locale}`
  }

  render() {
    const { railsContext } = this.props
    return (
      <SelectLanguage
        locales={railsContext.availableLocales}
        selected={railsContext.i18nLocale}
        onChange={this.onChangeLocale} />
    )
  }
}

export default withContext(SelectLanguageApp)
