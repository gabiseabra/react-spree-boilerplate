import { connect } from "react-redux"
import { Navigation } from "../../../components/app"
import { getOrder } from "../../../redux/selectors/cart"

const props = state => ({
  order: getOrder(state)
})

export default connect(props)(Navigation.Cart)
