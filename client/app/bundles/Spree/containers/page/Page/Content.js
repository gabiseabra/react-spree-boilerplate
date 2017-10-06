import { connect } from "react-redux"
import { Page } from "../../../components/page"
import { isPageLoaded } from "../../../redux/selectors/page"

const props = state => ({
  loading: !isPageLoaded(state)
})

export default connect(props)(Page.Content)
