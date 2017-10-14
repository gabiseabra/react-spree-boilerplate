import React from "react"
import styles from "./Footer.scss"

const Footer = () => (
  <footer className={styles.Footer}>
    &copy; {(new Date()).getFullYear()} Gabriela Seabra
  </footer>
)

export default Footer
