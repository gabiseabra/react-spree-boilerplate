import React from "react"
import PropTypes from "prop-types"
import { Layout } from "antd"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"
import LocaleProvider from "../../../../components/LocaleProvider"

const Shell = ({ children }) => (
  <LocaleProvider>
    <Layout className={styles.Shell}>
      <Header />
      <Layout.Content className={styles.content}>
        {children}
      </Layout.Content>
      <Footer />
    </Layout>
  </LocaleProvider>
)

Shell.propTypes = {
  children: PropTypes.node.isRequired
}

export default Shell
