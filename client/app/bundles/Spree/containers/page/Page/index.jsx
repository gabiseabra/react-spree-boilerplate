import _ from "lodash"
import qs from "querystring"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Page } from "../../../components/page"
import { load } from "../../../redux/modules/page"
import Content from "./Content"

class PageApp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { location } = this.props
    const query = (
      location.search ?
      qs.parse(location.search.slice(1)) :
      {}
    )
    this.props.load(
      location.pathname,
      query.page || 1
    )
  }

  get restProps() {
    return _.without(
      this.props,
      "load",
      "history",
      "location",
      "match",
      "staticContext"
    )
  }

  render() {
    const { children } = this.props
    return <Page {...this.restProps}>{children}</Page>
  }
}

PageApp.Title = Page.Title

PageApp.Content = Content

export default connect(undefined, { load })(withRouter(PageApp))
