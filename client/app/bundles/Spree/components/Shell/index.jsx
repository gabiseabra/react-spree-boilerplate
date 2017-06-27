import React from "react"
import PropTypes from "prop-types"
import { Container } from "semantic-ui-react"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"

const Shell = ({ children, taxonomies, onChangeLocale }) => (
  <div className={styles.Shell}>
    <Header taxonomies={taxonomies} onChangeLocale={onChangeLocale} />
    <Container as="main" className={styles.content}>
      {children}
    </Container>
    <Footer />
  </div>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  taxonomies: PropTypes.arrayOf(PropTypes.object),
  onChangeLocale: PropTypes.func.isRequired
}

export default Shell
