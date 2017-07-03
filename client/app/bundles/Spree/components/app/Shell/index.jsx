import React from "react"
import PropTypes from "prop-types"
import { Container } from "semantic-ui-react"
import Header from "./Header"
import Footer from "./Footer"

const Shell = ({ children, navigation }) => (
  <div>
    <Header navigation={navigation} />
    <Container as="main">
      {children}
    </Container>
    <Footer />
  </div>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  navigation: PropTypes.node.isRequired
}

export default Shell
