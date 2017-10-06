import React from "react"
import PropTypes from "prop-types"
import { Pagination as PaginationComponent } from "react-bootstrap"
import styles from "./Pagination.scss"

const Pagination = ({ currentPage, totalPages, ...props }) => (
  <div className={styles.Pagination}>
    <PaginationComponent
      prev next
      first last
      ellipsis
      boundaryLinks
      maxButtons={7}
      items={totalPages}
      activePage={currentPage}
      {...props} />
  </div>
)

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination
