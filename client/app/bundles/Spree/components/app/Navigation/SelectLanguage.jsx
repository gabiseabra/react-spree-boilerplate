import React from "react"
import PropTypes from "prop-types"
import languages from "app/locales/languages"
import { Dropdown, Flag } from "semantic-ui-react"

const SelectLanguage = ({ locales, selected, onChange }) => (
  <Dropdown
    text="Language"
    icon="world"
    className="icon"
    labeled
    button>
    <Dropdown.Menu>
      {locales.map(l => (
        <Dropdown.Item
          key={l}
          selected={selected === l}
          onClick={() => onChange(l)}>
          <Flag name={languages[l].flag} />
          {languages[l].label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
)

SelectLanguage.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default SelectLanguage
