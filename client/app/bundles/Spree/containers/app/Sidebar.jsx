import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Sidebar } from "../../components/app"
import { getAllTaxonomies } from "../../redux/selectors/taxonomies"

const SidebarApp = ({ taxonomies }) => (
  <Sidebar taxonomies={taxonomies} />
)

SidebarApp.propTypes = {
  taxonomies: PropTypes.arrayOf(PropTypes.object)
}

const mapper = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default connect(mapper)(SidebarApp)
