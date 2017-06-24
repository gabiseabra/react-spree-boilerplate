import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Pagination } from "antd"
import { getPagination } from "../redux/selectors"
import { loadPage } from "../redux/modules/page"

class AppPagination extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired
  }

  onChange = page => this.props.loadPage(page)

  render() {
    const { pagination, ...props } = this.props
    const { currentPage, totalCount, perPage } = pagination
    return (
      <Pagination
        current={currentPage}
        total={totalCount}
        pageSize={perPage}
        onChange={this.onChange}
        {...props} />
    )
  }
}


const mapper = state => ({
  pagination: getPagination(state)
})

export default connect(mapper, { loadPage })(AppPagination)
