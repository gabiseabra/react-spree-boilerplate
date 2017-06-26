import React from "react"
import PropTypes from "prop-types"
import { Container } from "semantic-ui-react"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"

const Shell = ({ children, taxonomies }) => (
  <div className={styles.Shell}>
    <Header taxonomies={taxonomies} />
    <Container as="main" className={styles.content}>
      {children}
    </Container>
    <Footer />
  </div>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

export default Shell
