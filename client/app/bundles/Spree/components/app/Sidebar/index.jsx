import React from "react"
import PropTypes from "prop-types"
import { Menu, Accordion, Icon } from "semantic-ui-react"
import styles from "./Sidebar.css"

const Node = ({ taxon, onChange }) => {
  const title = <a onClick={onChange} tabIndex="0">{taxon.name}</a>
  return (
    <Menu.Item>
      {taxon.taxons.length === 0 ? title : (
        <Accordion className={styles.accordion} exclusive={false} fluid>
          <Accordion.Title>
            <Icon name="dropdown" />
            {title}
          </Accordion.Title>
          <Accordion.Content>
            {taxon.taxons.map(t => <Node key={t.id} taxon={t} onChange={onChange} />)}
          </Accordion.Content>
        </Accordion>
      )}
    </Menu.Item>
  )
}

Node.propTypes = {
  taxon: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

const Sidebar = ({ taxonomies, onChange, ...props }) => (
  <Menu vertical {...props}>
    {taxonomies.map(t => <Node key={t.id} taxon={t} onChange={onChange} />)}
  </Menu>
)

Sidebar.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
}

export default Sidebar
