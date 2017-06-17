import React, { Component } from "react"
import PropTypes from "prop-types"
// import { compose } from "redux"
import { connect } from "react-redux"
import { withStore } from "../../redux"
import { HomePage } from "../../components"
import { getPageProducts, getPagination } from "../../redux/selectors"
import { load } from "../../redux/modules/page"

class HomePageApp extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  /*
  componentWillMount() {
    this.props.load("/")
  }
  */

  render() {
    const { products, pagination } = this.props
    return <HomePage products={products || []} pagination={pagination} />
  }
}

const mapper = (state) => ({
  products: getPageProducts(state),
  pagination: getPagination(state)
})

export default withStore(connect(mapper, { load })(HomePageApp))
