import React from "react"
import classnames from "classnames"
import { Button } from "react-bootstrap"
import propTypes from "../propTypes"
import styles from "./Color.scss"

const Color = ({ id, value, selected, onSelect }) => (
  <Button
    className={classnames(
      styles.Color,
      styles[value.toLowerCase()]
    )}
    title={value}
    value={id}
    active={selected}
    onClick={onSelect} />
)

Color.propTypes = propTypes

export default Color
