import React from "react"
import PropTypes from "prop-types"
import languages from "app/locales/languages"
import { Nav, NavDropdown, MenuItem } from "react-bootstrap"

const SelectLanguage = ({ locales, selected, onChange }) => (
  <Nav>
    <NavDropdown id="Navigation-Language" title="Language">
      {locales.map(l => (
        <MenuItem
          key={l}
          selected={l === selected}
          onSelect={() => onChange(l)}>
          {languages[l].label}
        </MenuItem>
      ))}
    </NavDropdown>
  </Nav>
)

SelectLanguage.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default SelectLanguage
