import React from "react"
import PropTypes from "prop-types"
import { Segment, Grid } from "semantic-ui-react"
import * as Nav from "../Navigation"
import Logo from "../Logo"
import styles from "./Header.css"

const Header = ({ taxonomies, onChangeLocale }) => (
  <Segment as="header" className={styles.Header}>
    <Grid columns={2}>
      <Grid.Column width={4}>
        <a href="/"><Logo size="small" /></a>
      </Grid.Column>
      <Grid.Column>
        <Nav.Header taxonomies={taxonomies} onChangeLocale={onChangeLocale} />
      </Grid.Column>
    </Grid>
  </Segment>
)


Header.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object),
  onChangeLocale: PropTypes.func.isRequired
}

export default Header
