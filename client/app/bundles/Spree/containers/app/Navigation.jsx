import React from "react"
import { connect } from "react-redux"
import { getAllTaxonomies } from "../../redux/selectors/taxonomies"
import { Navigation } from "../../components/app"
import { UserNav, Login } from "../auth"
import { Preview as Cart } from "../cart"
import Language from "./SelectLanguage"

const NavigationApp = ({ taxonomies }) => (
  <Navigation
    taxonomies={taxonomies}
    cart={<Cart />}
    language={<Language />}
    user={<UserNav><Login /></UserNav>} />
)


const props = state => ({
  taxonomies: getAllTaxonomies(state)
})

export default connect(props)(NavigationApp)
