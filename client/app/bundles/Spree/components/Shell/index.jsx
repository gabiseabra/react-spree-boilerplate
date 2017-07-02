import React from "react"
import PropTypes from "prop-types"
import { Container } from "semantic-ui-react"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"

const Shell = ({ children, navigation }) => (
  <div className={styles.Shell}>
    <Header navigation={navigation} />
    <Container as="main" className={styles.content}>
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
