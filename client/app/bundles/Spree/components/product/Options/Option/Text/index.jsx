import React from "react"
import { Button } from "react-bootstrap"
import propTypes from "../propTypes"

const Text = ({ id, value, presentation, selected, onSelect }) => (
  <Button
    value={id}
    title={value}
    active={selected}
    onClick={onSelect}>
    {presentation}
  </Button>
)

Text.propTypes = propTypes

export default Text
