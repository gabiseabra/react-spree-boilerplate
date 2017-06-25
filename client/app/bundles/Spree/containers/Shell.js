import { connect } from "react-redux"
import { Shell } from "../components"
import { getAllTaxonomies } from "../redux/selectors"

const mapper = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default connect(mapper)(Shell)
