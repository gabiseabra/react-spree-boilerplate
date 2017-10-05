import { connect } from "react-redux"
import { Preview } from "../../components/cart"
import { getOrder } from "../../redux/selectors/cart"

const props = state => ({
  order: getOrder(state)
})

export default connect(props)(Preview)
