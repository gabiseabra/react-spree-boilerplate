import React from "react"
import PropTypes from "prop-types"
import { Segment, Grid } from "semantic-ui-react"
import Logo from "../Logo"

const Header = ({ navigation }) => (
  <Segment as="header">
    <Grid columns={2}>
      <Grid.Column width={4}>
        <a href="/"><Logo size="small" /></a>
      </Grid.Column>
      <Grid.Column>
        {navigation}
      </Grid.Column>
    </Grid>
  </Segment>
)

Header.propTypes = {
  navigation: PropTypes.node.isRequired
}

export default Header
