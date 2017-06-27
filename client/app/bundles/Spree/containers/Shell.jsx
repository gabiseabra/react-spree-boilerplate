import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Shell } from "../components"
import { getAllTaxonomies } from "../redux/selectors"

class ShellApp extends Component {
  static propTypes = {
    taxonomies: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.node.isRequired
  }

  onChangeLocale = (locale) => {
    window.location.href = `/locale/set?locale=${locale}`
  }

  render() {
    const { taxonomies, children } = this.props
    return (
      <Shell taxonomies={taxonomies} onChangeLocale={this.onChangeLocale}>
        {children}
      </Shell>
    )
  }
}

const mapper = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default connect(mapper)(ShellApp)
