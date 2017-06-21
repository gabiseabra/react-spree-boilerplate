import React from "react"
import styles from "./Footer.css"

const Footer = () => (
  <footer className={styles.Footer}>
    {/* nav */}
    <div className={styles.copy}>
      &copy; {(new Date).getFullYear()} Gabriela Seabra
    </div>
  </footer>
)

export default Footer
