import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withProvider } from "./Provider"
import Shell from "./Shell"
import Pagination from "./Pagination"
import { HomePage } from "../components"
import { getPageProducts } from "../redux/selectors"
import { load } from "../redux/modules/page"

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

export default withProvider(connect(mapper, { load })(HomePageApp))
