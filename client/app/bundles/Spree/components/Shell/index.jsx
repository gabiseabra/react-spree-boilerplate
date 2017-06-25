import React from "react"
import PropTypes from "prop-types"
import { Layout } from "antd"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"

const Shell = ({ children, taxonomies }) => (
  <Layout className={styles.Shell}>
    <Header taxonomies={taxonomies} />
    <Layout.Content className={styles.content}>
      {children}
    </Layout.Content>
    <Footer />
  </Layout>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

export default Shell
