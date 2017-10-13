import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Page } from "../../../components/page"
import { isPageLoaded } from "../../../redux/selectors/page"

const ContentApp = ({ loading, ...props }, { load }) => (
  <Page.Content loading={load && loading} {...props} />
)

ContentApp.propTypes = {
  loading: PropTypes.bool.isRequired
}

ContentApp.contextTypes = {
  load: PropTypes.bool.isRequired
}

const props = state => ({
  loading: !isPageLoaded(state)
})

export default connect(props)(ContentApp)
