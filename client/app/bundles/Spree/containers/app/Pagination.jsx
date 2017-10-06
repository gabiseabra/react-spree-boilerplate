import _ from "lodash"
import qs from "querystring"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { push } from "react-router-redux"
import { Pagination } from "../../components/app"
import { getPagination } from "../../redux/selectors/page"
import { loadPage } from "../../redux/modules/page"

class AppPagination extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }

  onSelect = (page) => {
    const { location } = this.props
    const query = (
      location.search ?
      qs.parse(location.search.slice(1)) :
      {}
    )
    this.props.loadPage(page)
    this.props.push({
      ...location,
      search: qs.stringify({ ...query, page })
    })
  }

  get restProps() {
    return _.without(
      this.props,
      "pagination",
      "loadPage",
      "history",
      "location",
      "match",
      "staticContext"
    )
  }

  render() {
    const { pagination } = this.props
    const { currentPage, totalPages } = pagination
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onSelect={this.onSelect}
        {...this.restProps} />
    )
  }
}

const mapper = state => ({
  pagination: getPagination(state)
})

export default connect(mapper, { loadPage, push })(withRouter(AppPagination))
