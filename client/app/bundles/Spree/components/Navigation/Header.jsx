import React from "react"
import PropTypes from "prop-types"
import { Menu } from "semantic-ui-react"
import { withContext } from "app/components"
import { Taxonomy } from "../../lib/ApiClient/models"
import SelectLanguage from "./SelectLanguage"

const Nav = ({ taxonomies, onChangeLocale, railsContext, ...props }) => (
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
  railsContext: PropTypes.object.isRequired,
  onChangeLocale: PropTypes.func.isRequired
}

export default withContext(Nav)
