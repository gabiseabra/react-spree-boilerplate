import React from "react"
import PropTypes from "prop-types"
import languages from "app/locales/languages"
import { Menu, Dropdown, Flag } from "semantic-ui-react"
import { Taxonomy } from "../../lib/ApiClient/models"

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

const Nav = ({ taxonomies, onChangeLocale, ...props }, { railsContext }) => (
  <Menu {...props}>
    <Menu.Item>Home</Menu.Item>
    {taxonomies.map(taxon => (
      <Menu.Item key={`taxonomy:${taxon.id}`}>
        {taxon.name}
      </Menu.Item>
    ))}
    <Menu.Item>
      <SelectLanguage
        locales={railsContext.availableLocales}
        selected={railsContext.i18nLocale}
        onChange={onChangeLocale} />
    </Menu.Item>
  </Menu>
)

Nav.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.instanceOf(Taxonomy)),
  onChangeLocale: PropTypes.func.isRequired
}

Nav.contextTypes = {
  railsContext: PropTypes.object.isRequired
}

export default Nav
