import _ from "lodash"
import qs from "qs"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Page } from "../../../components/page"
import { load as loadPath, loadPage } from "../../../redux/modules/page"
import Content from "./Content"

const parseQuery = search => (search ? qs.parse(search.slice(1)) : {})

const getPath = props => (
  typeof props.load === "string" ?
  props.load :
  props.load && props.location.pathname
)

class PageApp extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    load: PropTypes.oneOfType(
      PropTypes.bool,
      PropTypes.string
    ).isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired,
    loadPath: PropTypes.func.isRequired
  }

  static defaultProps = {
    load: false
  }

  componentWillMount() {
    if(this.props.load) this.loadPath(this.props)
  }

  componentWillReceiveProps(next) {
    if(!next.load) return
    const query = parseQuery(this.props.location.search)
    const nextQuery = parseQuery(next.location.search)
    if(getPath(next) !== getPath(this.props) ||
      !_.isEqual(nextQuery.search, query.search)) {
      this.loadPath(next)
    } else if(nextQuery.page !== query.page) {
      this.loadPage(next)
    }
  }

  loadPath(props) {
    const query = parseQuery(props.location.search)
    this.props.loadPath(
      getPath(props),
      query.page || 1,
      query.search
    )
  }

  loadPage({ location }) {
    const query = parseQuery(location.search)
    this.props.loadPage(query.page || 1)
  }

  render() {
    const { children } = this.props
    return <Page>{children}</Page>
  }
}

PageApp.Title = Page.Title

PageApp.Content = Content

export default connect(undefined, { loadPath, loadPage })(withRouter(PageApp))
