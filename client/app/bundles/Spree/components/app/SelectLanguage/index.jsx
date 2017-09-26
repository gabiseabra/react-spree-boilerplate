import React from "react"
import PropTypes from "prop-types"
import languages from "app/locales/languages"
import { SplitButton, MenuItem } from "react-bootstrap"

const SelectLanguage = ({ locales, selected, onChange }) => (
  <SplitButton title="Language">
    {locales.map(l => (
      <MenuItem
        key={l}
        active={selected === l}
        onSelect={() => onChange(l)}>
        {languages[l].label}
      </MenuItem>
    ))}
  </SplitButton>
)

SelectLanguage.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default SelectLanguage
