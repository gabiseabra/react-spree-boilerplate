import PropTypes from "prop-types"

export default {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  presentation: PropTypes.string.isRequired,
  optionType: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func
}
