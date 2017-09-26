import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Header } from "../../components/views"
import { Login, UserNav } from "../auth"
import { withProvider } from "../app"
import { getAllTaxonomies } from "../../redux/selectors"

const HeaderApp = ({ taxonomies }) => (
  <Header
    taxonomies={taxonomies}
    userNav={(
      <UserNav>
        <Login />
      </UserNav>
    )} />
)

HeaderApp.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

const props = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default withProvider(connect(props)(HeaderApp))
