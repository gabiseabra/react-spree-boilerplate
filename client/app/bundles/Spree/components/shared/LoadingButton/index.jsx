import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import classnames from "classnames"
import Spinner from "../Spinner"
import styles from "./LoadingButton.scss"

const LoadingButton = ({ className, loading, disabled, loadingText, children, ...props }) => {
  const isDisabled = (
    typeof disabled === "boolean" ?
    loading || disabled :
    loading
  )
  return (
    <Button
      disabled={isDisabled}
      className={classnames(className, styles.LoadingButton)}
      {...props}>
      {loading ? (loadingText || <Spinner center size="small" />) : children}
    </Button>
  )
}

LoadingButton.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.node,
  children: PropTypes.node
}

export default LoadingButton
