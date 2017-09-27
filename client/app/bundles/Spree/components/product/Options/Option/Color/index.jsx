import React from "react"
import { Button } from "react-bootstrap"
import propTypes from "../propTypes"

const Color = ({ id, selected, onSelect }) => (
  <Button
    value={id}
    active={selected}
    onClick={onSelect} />
)

Color.propTypes = propTypes

export default Color
