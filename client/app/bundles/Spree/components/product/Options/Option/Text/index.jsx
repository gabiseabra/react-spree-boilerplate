import React from "react"
import { Button } from "react-bootstrap"
import propTypes from "../propTypes"

const Text = ({ id, presentation, selected, onSelect }) => (
  <Button
    value={id}
    active={selected}
    onClick={onSelect}>
    {presentation}
  </Button>
)

Text.propTypes = propTypes

export default Text
