import qs from "querystring"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { push } from "react-router-redux"
import { getPageTaxons } from "../../redux/selectors/page"
import { QuickSearch } from "../../components/page"

class QuickSearchApp extends Component {
  static propTypes = {
    taxon: PropTypes.object,
    location: PropTypes.object
  }

  onSubmit = ({ value, limit }) => {
    const { taxon, location } = this.props
    const pathname = (taxon && limit) ? taxon.permalink : "/"
    const query = (
      location.search ?
      qs.parse(location.search.slice(1)) :
      {}
    )
    this.props.push({
      pathname,
      search: qs.stringify({
        ...query,
        "q[name_cont]": value
      })
    })
  }

  render() {
    const { taxon } = this.props
    return (
      <QuickSearch category={taxon && taxon.name} onSubmit={this.onSubmit} />
    )
  }
}

const props = state => ({
  taxon: (getPageTaxons(state) || [])[0]
})

export default connect(props, { push })(withRouter(QuickSearchApp))
