import { connect } from "react-redux"
import { Options } from "../../components/product"
import { getProductVariants, getOptionTypes } from "../../redux/selectors/products"

const props = (state, { productId }) => ({
  optionTypes: getOptionTypes(state, { id: productId }),
  variants: getProductVariants(state, { id: productId })
})

export default connect(props)(Options)
