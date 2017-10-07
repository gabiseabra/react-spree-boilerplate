import qs from "qs"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { push } from "react-router-redux"
import { getPageTaxons } from "../../redux/selectors/page"
import { QuickSearch } from "../../components/page"

const parseQuery = search => (search ? qs.parse(search.slice(1)) : {})

class QuickSearchApp extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
    predicate: PropTypes.string.isRequired,
    taxon: PropTypes.object,
    location: PropTypes.object
  }

  static defaultProps = {
    root: "/products",
    predicate: "name_cont"
  }

  constructor(props) {
    super(props)
    if(props.location.search) {
      const { predicate } = props
      const search = parseQuery(props.location.search).search
      if(search && (predicate in search)) {
        this.state.value = search[predicate]
      }
    }
  }

  state = {
    value: "",
    limit: true
  }

  onChangeValue = (e) => {
    const { onChange } = this.props
    const value = e.target.value
    this.setState({ value })
    if(onChange) onChange({ ...this.state, value })
  }

  onChangeLimit = (e) => {
    const { onChange } = this.props
    const limit = e.target.checked
    this.setState({ limit })
    if(onChange) onChange({ ...this.state, limit })
  }

  onSubmit = (e) => {
    const { value, limit } = this.state
    const { root, predicate, taxon, location } = this.props
    const pathname = (taxon && limit) ? taxon.permalink : root
    const query = (
      location.search ?
      qs.parse(location.search.slice(1)) :
      {}
    )
    this.props.push({
      pathname,
      search: qs.stringify({
        ...query,
        search: { [predicate]: value }
      })
    })
    e.preventDefault()
  }

  render() {
    const { taxon } = this.props
    const { value, limit } = this.state
    return (
      <QuickSearch
        value={value}
        limit={limit}
        category={taxon && taxon.name}
        onChangeValue={this.onChangeValue}
        onChangeLimit={this.onChangeLimit}
        onSubmit={this.onSubmit} />
    )
  }
}

const props = state => ({
  taxon: (getPageTaxons(state) || [])[0]
})

export default connect(props, { push })(withRouter(QuickSearchApp))
