import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withProvider } from "./Provider"
import Shell from "./Shell"
import Pagination from "./Pagination"
import { HomePage } from "../components"
import { getPageProducts, isPageLoaded } from "../redux/selectors"
import { load } from "../redux/modules/page"

class HomePageApp extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired
    // load: PropTypes.func.isRequired
  }

  /*
  componentWillMount() {
    this.props.load("/")
  }
  */

  render() {
    const { products, loading } = this.props
    return (
      <Shell>
        <HomePage
          loading={loading}
          products={products}
          pagination={<Pagination />} />
      </Shell>
    )
  }
}

const mapper = state => ({
  products: getPageProducts(state),
  loading: !isPageLoaded(state)
})

export default withProvider(connect(mapper, { load })(HomePageApp))
