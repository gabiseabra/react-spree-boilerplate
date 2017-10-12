import { connect } from "react-redux"
import { Preview } from "../../components/cart"
import { getOrder, isOrderLoading } from "../../redux/selectors/cart"

const props = state => ({
  loading: isOrderLoading(state),
  order: getOrder(state)
})

export default connect(props)(Preview)
