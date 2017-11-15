import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import classnames from "classnames"
import Spinner from "../Spinner"
import styles from "./LoadingButton.scss"

const LoadingButton = ({ className, loading, disabled, children, ...props }) => {
  const isDisabled = (
    typeof disabled === "boolean" ?
    loading || disabled :
    loading
  )
  const buttonClass = classnames(
    className,
    styles.LoadingButton,
  )
  return (
    <Button
      disabled={isDisabled}
      className={buttonClass}
      {...props}>
      {loading && <Spinner center size="small" />}
      {children}
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
