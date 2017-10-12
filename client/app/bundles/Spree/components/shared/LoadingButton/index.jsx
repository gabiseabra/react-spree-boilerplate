import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import Spinner from "../Spinner"

const LoadingButton = ({ loading, loadingText, children, ...props }) => (
  <Button disabled={loading} style={{ position: "relative" }} {...props}>
    {loading ? (loadingText || <Spinner center />) : children}
  </Button>
)

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.node,
  children: PropTypes.node
}

export default LoadingButton
