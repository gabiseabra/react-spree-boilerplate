import { connect } from "react-redux"
import { Messages } from "../../components/flash"
import { getMessages } from "../../redux/selectors/flash"
import { dismiss } from "../../redux/modules/flash"

const props = state => ({
  messages: getMessages(state)
})

export default connect(props, { onDismiss: dismiss })(Messages)

