import React from "react"
import PropTypes from "prop-types"
import { Pagination as PaginationComponent } from "react-bootstrap"

const Pagination = ({ currentPage, totalPages, ...props }) => (
  <PaginationComponent
    prev next
    first last
    ellipsis
    boundaryLinks
    maxButtons={7}
    items={totalPages}
    activePage={currentPage}
    {...props} />
)

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination
