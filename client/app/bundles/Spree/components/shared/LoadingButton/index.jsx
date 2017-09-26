import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const LoadingButton = ({ loading, loadingText, children, ...props }) => (
  <Button disabled={loading} {...props}>
    (loading ? loadingText : children)
  </Button>
)

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.node,
  children: PropTypes.node
}

LoadingButton.defaultProps = {
  loadingText: "Loading"
}

export default LoadingButton
