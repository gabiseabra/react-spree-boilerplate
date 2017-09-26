import { connect } from "react-redux"
import { Navigation } from "../../../components/app"
import { getAllTaxonomies } from "../../../redux/selectors"

const props = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default connect(props)(Navigation.Taxonomies)
