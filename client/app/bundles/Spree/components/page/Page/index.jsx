import React from "react"
import PropTypes from "prop-types"
import { Loader } from "../../shared"

const Page = ({ children }) => (
  <div>
    {children}
  </div>
)

Page.Title = ({ children }) => (<h2>{children}</h2>)

Page.Content = ({ loading, children }) => (
  <Loader dim loading={loading}>
    {children}
  </Loader>
)

Page.propTypes = {
  children: PropTypes.node
}

Page.Title.propTypes = {
  children: PropTypes.node
}

Page.Content.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node
}

Page.Content.defaultProps = {
  loading: false
}

export default Page
