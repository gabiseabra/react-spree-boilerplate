import React from "react"
import { Layout } from "antd"
import styles from "./Header.css"

const Header = () => (
  <Layout.Header className={styles.Header}>
    <img
      className={styles.logo}
      src={require("images/logo.svg")}
      alt="React Spree Boilerplate" />
    React Spree Boilerplate
  </Layout.Header>
)

export default Header
