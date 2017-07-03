import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withContext } from "app/components"
import { Navigation } from "../../components/app"
import { login, logout } from "../../redux/modules/auth"
import {
  getAllTaxonomies,
  getLoggedInUser,
  getAuthError,
  isAuthLoading
} from "../../redux/selectors"

class NavigationApp extends Component {
  static propTypes = {
    railsContext: PropTypes.object.isRequired,
    taxonomies: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.instanceOf(Error),
    user: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  onChangeLocale = (locale) => {
    window.location.href = `/locale/set?locale=${locale}`
  }

  onLogin = data => this.props.login(data)

  onLogout = () => this.props.logout()

  render() {
    const { railsContext, taxonomies, user, error, loading } = this.props
    return (
      <Navigation>
        <Navigation.Main taxonomies={taxonomies} />
        <Navigation.User
          user={user}
          error={error}
          loading={loading}
          onLogin={this.onLogin}
          onLogout={this.onLogout} />
        <Navigation.SelectLanguage
          locales={railsContext.availableLocales}
          selected={railsContext.i18nLocale}
          onChange={this.onChangeLocale} />
      </Navigation>
    )
  }
}

const mapper = state => ({
  taxonomies: getAllTaxonomies(state),
  user: getLoggedInUser(state),
  error: getAuthError(state),
  loading: isAuthLoading(state)
})

export default withContext(connect(mapper, { login, logout })(NavigationApp))
