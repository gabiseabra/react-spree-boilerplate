import React from "react"
import PropTypes from "prop-types"
import { Row, Col, Menu } from "antd"
import Logo from "../Logo"
import styles from "./Header.css"

const Header = ({ taxonomies }) => (
  <Row className={styles.Header}>
    <Col span={6}>
      <a href="/"><Logo size="small" /></a>
    </Col>
    <Col span={18}>
      <Menu mode="horizontal" theme="dark">
        {taxonomies && taxonomies.map(taxon => (
          <Menu.Item key={`taxonomy:${taxon.id}`}>
            <a href={`/t/${taxon.permalink}`}>{taxon.name}</a>
          </Menu.Item>
        ))}
      </Menu>
    </Col>
  </Row>
)


Header.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

export default Header
