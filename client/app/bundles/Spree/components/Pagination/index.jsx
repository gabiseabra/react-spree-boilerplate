import React from "react"
import PropTypes from "prop-types"
import { Pagination } from "antd"

const AppPagination = ({ pagination: p, ...props }) => (
  <Pagination
    current={p.currentPage}
    total={p.totalCount}
    pageSize={p.perPage}
    {...props} />
)

AppPagination.propTypes = {
  pagination: PropTypes.object.isRequired
}

export default AppPagination
