import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Pagination from "./Pagination"
import { Shell, HomePage } from "../components"
import { getPageProducts } from "../redux/selectors"
import { load } from "../redux/modules/page"
import { withStore } from "../redux"

class HomePageApp extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired
    // load: PropTypes.func.isRequired
  }

  defaultProps = {
    products: []
  }

  /*
  componentWillMount() {
    this.props.load("/")
  }
  */

  render() {
    const { products } = this.props
    return (
      <Shell>
        <HomePage
          products={products}
          pagination={<Pagination />} />
      </Shell>
    )
  }
}

const mapper = state => ({
  products: getPageProducts(state)
})

export default withStore(connect(mapper, { load })(HomePageApp))
